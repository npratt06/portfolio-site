import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Dynamo from '../../database/Dynamo';

export default class Test extends Component {

    handleClick() {
        console.log(`button clicked`);

        const id = uuidv4();
        const timestamp = Date();
        const params = {
            TableName: 'zomb-scores',
            Item: {
                'id': { S: id },
                'name': { S: 'test' },
                'score': { N: '1' },
                'date': { S: timestamp }
            }
        };
        const dbClient = new Dynamo();
        dbClient.insert(params);

    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick} style={{ width: '25vw', height: '25vw', color: '#000000' }}>
                    Submit
                </button>
            </div>
        )
    }
}