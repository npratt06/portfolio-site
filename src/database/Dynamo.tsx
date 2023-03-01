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
        const accessKeyId = process.env[ENV_VARS.DB_KEY];
        const secretAccessKey = process.env[ENV_VARS.DB_SECRET];
        if (!accessKeyId) throw 'Error getting DB Creds: process.env.DB_ACCESS_KEY undefined';
        if (!secretAccessKey) throw 'Error getting DB Creds: process.env.DB_SECRET undefined';
        AWS.config.credentials = new AWS.Credentials({
            accessKeyId,
            secretAccessKey
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