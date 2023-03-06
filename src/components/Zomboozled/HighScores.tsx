/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-this-alias */
import React, { Component, MouseEventHandler } from 'react';
import Dynamo from '../../database/Dynamo';
import { DEFAULT_HIGH_SCORE_NAME, headerAndRowStyle, highScoresStyle, NUM_SCORES, rowStyle, SCORE_DISPLAY_TYPES, tableStyle } from './HighScores.const';
import { HighScoreItem, HighScoresProps, HighScoresState } from './HighScores.interface';
import { v4 as uuidv4 } from 'uuid';
import { outerWrapper, rowElement } from './../JukeBox/JukeBox.interface';
import HomePageLink from './../Common/HomePageLink';
import { buttonStyle, inputElementStyle } from '../../globalCSS';
import { DB_LIMIT } from './HighScores.const';

export default class HighScores extends Component<HighScoresProps, HighScoresState> {
  dbClient: Dynamo | null;

  handlePlayAgainBtnClick: MouseEventHandler<HTMLButtonElement>;

  constructor(props: HighScoresProps) {
    super(props);

    this.handlePlayAgainBtnClick = props.playAgainHandler;

    const newScore: HighScoreItem = {
      id: uuidv4(),
      name: DEFAULT_HIGH_SCORE_NAME,
      score: props.newScore,
      date: Date()
    };

    this.state = {
      scores: [],
      newScore,
      scoreSubmitted: false
    };

    try {
      this.dbClient = new Dynamo();
    } catch (err) {
      console.log(`Error occurred setting up db connection: ${err}`);
      this.dbClient = null;
    }
  }

  onInputChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const newName = ev.target.value;
    const ns = this.state.newScore;
    ns.name = newName;
    const updatedScores = this.state.scores;
    let replaceIndex = 0;
    for (let i = 0; i < updatedScores.length; i++) {
      if (updatedScores[i].id === ns.id) {
        replaceIndex = i;
      }
    }
    updatedScores.splice(replaceIndex, 1, ns);
    this.setState({ scores: updatedScores, newScore: ns });
  }

  async componentDidMount() {
    if (this.dbClient && this.state.scores.length < 1) {
      try {
        const updatedScores = await this.getUpdatedScoreList();
        this.setState({ scores: updatedScores });
      } catch (err) {
        console.log(`Error occurred querying the db: ${err}`);
        this.dbClient = null;
        this.setState({ scores: [] });
      }
    }
  }

  sortScores(scoreItems: HighScoreItem[]) {
    scoreItems.sort((a: HighScoreItem, b: HighScoreItem) => {
      const date1 = new Date(a.date).getTime();
      const date2 = new Date(b.date).getTime();
      return date1 - date2;
    });
    scoreItems.sort((a: HighScoreItem, b: HighScoreItem) => {
      return b.score - a.score;
    });
    return scoreItems;
  }

  async pruneScores(scoreItems: HighScoreItem[]) {
    if (scoreItems.length > DB_LIMIT) {
      const deleteItems = [];
      // gather IDs of scores to delete
      for (let i = 0; i < scoreItems.length - DB_LIMIT; i++) {
        const index = scoreItems.length - 1 - i;
        deleteItems.push(scoreItems[index]);
      }
      // delete scores based on deleteIDs array
      for (let i = 0; i < deleteItems.length; i++) {
        const deleteID = deleteItems[i].id;
        const deleteScore= deleteItems[i].score;
        console.log(`Pruning db: db limit is ${DB_LIMIT}, num scores is ${scoreItems.length}`);
        console.log(`Deleting the following items ${JSON.stringify(deleteItems[i], null, 1)}`);
        await this.deleteScore(deleteID, deleteScore);
      }
    }
  }

  async deleteScore(id: string, score: number) {
    const deleteParams: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: 'zomb-scores',
      Key: { id, score }

    };
    await this.dbClient!.delete(deleteParams);
  }

  async getUpdatedScoreList() {
    let scoreItems = (await this.getExistingScores()) as HighScoreItem[];
    // sort by date, then by score
    // can we speed this up? shouldn't matter for now due to automatic data pruning
    scoreItems = this.sortScores(scoreItems);
    this.pruneScores(scoreItems);
    if (scoreItems.length > NUM_SCORES) {
      scoreItems.splice(NUM_SCORES, scoreItems.length - NUM_SCORES);
    }
    const newScore = this.state.newScore.score;
    let insertIndex = 0;
    for (let i = 0; i < scoreItems.length; i++) {
      if (newScore > scoreItems[i].score) {
        insertIndex = i;
        break;
      }
      if (i === scoreItems.length - 1) {
        insertIndex = scoreItems.length;
      }
    }
    const newHighScoreItem = this.state.newScore;

    scoreItems.splice(insertIndex, 0, newHighScoreItem);
    const updatedScores = JSON.parse(JSON.stringify(scoreItems));
    return updatedScores;
  }

  addNewScoreToDB(newHighScoreItem: HighScoreItem) {
    const insertParams = {
      TableName: 'zomb-scores',
      Item: newHighScoreItem
    };

    this.dbClient!.insert(insertParams);
    this.setState({ scoreSubmitted: true });
  }

  async getExistingScores() {
    const params = {
      TableName: 'zomb-scores'
    };
    const existingScores = await this.dbClient!.getAll(params);
    if (!existingScores) throw 'Error retrieving high scores from database';
    return existingScores;
  }

  getScoreTableComponent(items: HighScoreItem[]) {
    const scoreTableItems = items.map((item, index) => {
      let itemStyle = {};
      if (index === 0) {
        itemStyle = {color: '#FFd700'}
      } else if (index === 1) {
        itemStyle = {color: '#C0C0C0'}
      } else if (index === 2) {
        itemStyle = {color: '#CD7F32'}
      }
      if (this.state.newScore.id === item.id) {
        itemStyle = this.state.scoreSubmitted ? { ...itemStyle, border: '3px solid #00ff00' } : { ...itemStyle, border: '3px solid #ff0000' };
      }
      return (
        <tr style={headerAndRowStyle} key={index}>
          <td style={{...headerAndRowStyle, ...rowStyle, ...itemStyle}}>{`${item.name}`}</td>
          <td style={{...headerAndRowStyle, ...rowStyle, ...itemStyle}}>{`${item.score}`}</td>
        </tr>
      );
    });
    return (
      <table style={tableStyle}>
        <tbody>
          <tr style={headerAndRowStyle}>
            <th style={headerAndRowStyle}>Name</th>
            <th style={headerAndRowStyle}>Kills</th>
          </tr>
          {scoreTableItems}
        </tbody>
    </table>
    );
  }

  getScoreListComponent(items: HighScoreItem[]) {
    const scoreListItems = items.map((item, index) => {
      const displayStr = `${item.name}: ${item.score}`;
      let listItemstyle = {};
      if (this.state.newScore.id === item.id) {
        listItemstyle = this.state.scoreSubmitted ? { color: '#00ff00' } : { color: '#ff0000' };
      }
      return (
        <li key={index} style={{ ...listItemstyle }}>
          {displayStr}
        </li>
      );
    });
    return (
      <ol>
        {scoreListItems}
      </ol>
    );
  }

  getInputComponents() {
    let inputComponents;
    if (this.state.scoreSubmitted) {
      inputComponents = <div style={{...rowElement, marginTop: '2vw'}}>{`Congrats ${this.state.newScore.name}, your high score has been submitted!`}</div>;
    } else {
      inputComponents = (
        <div>
          <div style={{...rowElement, marginTop: '2vw', marginBottom: '2vw'}}>Your score: {this.props.newScore}</div>
          <div style={{...rowElement, marginTop: '2vw', marginBottom: '2vw'}}>
            You got a new high score! Enter your name:{' '}
            <input
              id="name-input"
              maxLength={6}
              onChange={(ev) => {
                this.onInputChange(ev);
              }}
              style={{...inputElementStyle, marginLeft: '1.5vw'}}
              type="text"
              defaultValue={this.state.newScore.name}
            ></input>
          </div>
          <div style={{...rowElement, marginTop: '2vw', marginBottom: '2vw'}}>
            <button
              style={{...buttonStyle, fontSize: '0.9vw'}}
              onClick={() => {
                this.addNewScoreToDB(this.state.newScore);
              }}
            >
              Submit high score
            </button>
          </div>
        </div>
      );
    }
    return inputComponents;
  }

  getComponents() {
    let scoreboardComponents = (
      <div style={rowElement}>
        <div>Fetching High Scores...</div>
      </div>
    );
    if (!this.dbClient) {
      scoreboardComponents = (
        <div style={rowElement}>
          <div>Unable to fetch high scores</div>
        </div>
      );
    } else if (this.state.scores.length > 0) {

      // todo: make this change-able by the user? maybe list can be called 'detail view', add date
      const scoreDisplayType = SCORE_DISPLAY_TYPES.TABLE;
      const highScores = scoreDisplayType === SCORE_DISPLAY_TYPES.TABLE ? this.getScoreTableComponent(this.state.scores) : this.getScoreListComponent(this.state.scores);
      const inputComponents = this.getInputComponents();
      if (scoreDisplayType) {
        scoreboardComponents = (
          <div>
            <div style={rowElement}>
              <h1 style={{fontSize: '2vw'}}>High Scores</h1>
            </div>
            <div style={rowElement}>
              {highScores}
            </div>
            {inputComponents}
          </div>
        );
      }
    }
    
    const highScoreComponents = (
      <div style={{width: '100vw'}}>
        {scoreboardComponents}
        <div style={{...rowElement, marginTop: '2vw', marginBottom: '2vw'}}>
          <button style={{...buttonStyle, fontSize: '0.9vw'}} onClick={this.handlePlayAgainBtnClick.bind(this)}>
            Play Again
          </button>
        </div>
      </div>
    );

    return (
      <div style={highScoresStyle}>
        <div style={outerWrapper}>
          <HomePageLink />
          <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: '100vh', alignItems: 'center' }}>
            <div style={rowElement}>{highScoreComponents}</div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const components = this.getComponents();
    return <div>{components}</div>;
  }
}
