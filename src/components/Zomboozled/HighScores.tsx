import React, { Component, MouseEventHandler } from 'react';
import { headerAndRowStyle, highScoresStyle, rowStyle, tableStyle } from './HighScores.const';
import { HighScoreItem, HighScoresProps, HighScoresState } from './HighScores.interface';
import { outerWrapper, rowElement } from './../JukeBox/JukeBox.interface';
import HomePageLink from './../Common/HomePageLink';
import { buttonStyle } from '../../globalCSS';
import { offlineHighScoresService } from './HighScores.service';

export default class HighScores extends Component<HighScoresProps, HighScoresState> {
  handlePlayAgainBtnClick: MouseEventHandler<HTMLButtonElement>;

  constructor(props: HighScoresProps) {
    super(props);

    this.handlePlayAgainBtnClick = props.playAgainHandler;

    this.state = {
      scores: [],
      highScoresAvailable: false,
      scoresLoading: true
    };
  }

  async componentDidMount() {
    try {
      const result = await offlineHighScoresService.listScores();
      this.setState({
        scores: this.sortScores(result.scores),
        highScoresAvailable: result.available,
        scoresLoading: false
      });
    } catch (err) {
      console.log(`Error occurred loading high score placeholder: ${err}`);
      this.setState({ scores: [], highScoresAvailable: false, scoresLoading: false });
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

  getScoreTableComponent(items: HighScoreItem[]) {
    const scoreTableItems = items.map((item, index) => {
      let itemStyle = {};
      if (index === 0) {
        itemStyle = { color: '#FFd700' };
      } else if (index === 1) {
        itemStyle = { color: '#C0C0C0' };
      } else if (index === 2) {
        itemStyle = { color: '#CD7F32' };
      }
      return (
        <tr style={headerAndRowStyle} key={index}>
          <td style={{ ...headerAndRowStyle, ...rowStyle, ...itemStyle }}>{`${item.name}`}</td>
          <td style={{ ...headerAndRowStyle, ...rowStyle, ...itemStyle }}>{`${item.score}`}</td>
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

  getOfflineNoticeComponent() {
    return (
      <div>
        <div style={{ ...rowElement, marginTop: '2vw', marginBottom: '2vw' }}>Your score: {this.props.newScore}</div>
        <div style={{ ...rowElement, marginBottom: '1vw' }}>Online high scores are paused while this backend is rebuilt.</div>
        <div style={rowElement}>Your run was not submitted, but Zomboozled is still playable locally.</div>
      </div>
    );
  }

  getComponents() {
    const scoreboardComponents =
      this.state.highScoresAvailable && this.state.scores.length > 0 ? (
        <div>
          <div style={rowElement}>
            <h1 style={{ fontSize: '2vw' }}>High Scores</h1>
          </div>
          <div style={rowElement}>{this.getScoreTableComponent(this.state.scores)}</div>
          <div style={{ ...rowElement, marginTop: '2vw' }}>Your score: {this.props.newScore}</div>
        </div>
      ) : (
        <div>
          <div style={rowElement}>
            <h1 style={{ fontSize: '2vw' }}>Game Over</h1>
          </div>
          {this.state.scoresLoading ? <div style={rowElement}>Loading score screen...</div> : this.getOfflineNoticeComponent()}
        </div>
      );

    const highScoreComponents = (
      <div style={{ width: '100vw' }}>
        {scoreboardComponents}
        <div style={{ ...rowElement, marginTop: '2vw', marginBottom: '2vw' }}>
          <button style={{ ...buttonStyle, fontSize: '0.9vw' }} onClick={this.handlePlayAgainBtnClick.bind(this)}>
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
