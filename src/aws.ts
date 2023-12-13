import AWS from 'aws-sdk';
// import aws from './configs/aws';
import { awsConfig } from './configs/aws';
import { Application } from './declarations';

export default function (app: Application) {
    AWS.config.update(awsConfig);

    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

    app.set('s3', s3);
}