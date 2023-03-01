import React, { Component } from 'react'
import Dynamo from '../../database/Dynamo';
import { highScoresStyle } from './HighScores.const';
import { HighScoreItem, HighScoresProps, HighScoresState } from './HighScores.interface';
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from '../../utils/DateUtils';

export default class HighScores extends Component<HighScoresProps, HighScoresState> {

    dbClient: Dynamo = new Dynamo();

    constructor(props: HighScoresProps) {
        super(props);
        this.state = {
            scores: []
        }
    }

    async componentDidMount() {
        if (this.state.scores.length < 1) {
            const scoreItems = await this.retrieveHighScores() as HighScoreItem[];
            // sort by date, then by score
            // can we speed this up? shouldn't matter for now due to automatic data pruning
            scoreItems.sort((a: HighScoreItem, b: HighScoreItem) => {
                const date1 = new Date(a.date).getTime();
                const date2 = new Date(b.date).getTime();
                return (date1 - date2);
            });
            scoreItems.sort((a: HighScoreItem, b: HighScoreItem) => {
                return b.score - a.score;
            });
            const newScore = this.props.newScore;
            let insertIndex = 0;
            for(let i = 0; i < scoreItems.length; i++) {
                if (newScore > scoreItems[i].score) {
                    insertIndex = i;
                    break;
                }
                if (i === scoreItems.length - 1) {
                    insertIndex = scoreItems.length;
                }
            }
            const newHighScoreItem = {
                id: uuidv4(),
                name: 'TEST3',
                score: newScore,
                date: Date()
            };
            
            const insertParams = {
                TableName: 'zomb-scores',
                Item: newHighScoreItem
            };

            this.dbClient.insert(insertParams);
            scoreItems.splice(insertIndex, 0, newHighScoreItem);
            const updatedScores = JSON.parse(JSON.stringify(scoreItems));

            this.setState({ scores: updatedScores });
        }
    }

    async retrieveHighScores() {
        const params = {
            TableName: 'zomb-scores'
        }
        const existingScores = await this.dbClient.getAll(params);
        if (!existingScores) throw 'Error retrieving high scores from database';
        return existingScores;
    }

    getComponents() {
        let components = (
            <div>Fetching High Scores...</div>
        );
        if (this.state.scores.length > 0) {
            const items = this.state.scores;
            const scoreListItems = items.map((item, index) => {
                const displayStr = `${item.name}: ${item.score} - ${formatDate(new Date(item.date))}`;
                return (<li key={index}>{displayStr}</li>);
            });
            components = (
                <ol>
                    {scoreListItems}
                </ol>
            );
        }

        return (
            <div style={highScoresStyle}>
                {components}
            </div>
        )
    }

    render() {
        const components = this.getComponents();
        return (
            <div>{components}</div>
        )
    }
}
