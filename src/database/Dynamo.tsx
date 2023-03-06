import AWS from 'aws-sdk';
import { ENV_VARS } from './database.const';

export default class Dynamo {

    db;

    constructor() {
        AWS.config.region = 'us-east-2';
        this.retrieveCreds();
        this.db = new AWS.DynamoDB.DocumentClient({ apiVersion: 'latest' });
    }

    retrieveCreds() {
        const pool_id = process.env[ENV_VARS.IDENTITY_POOL_ID];
        if (!pool_id) throw 'Error retrieving db creds: pool id undefined';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            'IdentityPoolId': pool_id
        });
    }

    insert(params: AWS.DynamoDB.DocumentClient.PutItemInput) {
        this.db.put(params, function (err, data) {
            if (err) {
                console.log("Error executing database insert", err);
            } else {
                console.log("Database insert was successful", data);
            }
        });
    }

    async getAll(params: AWS.DynamoDB.ScanInput) {
        const scanResultsRaw = await this.db.scan(params).promise();
        const scanResults = scanResultsRaw.Items;
        return scanResults;
    }
}