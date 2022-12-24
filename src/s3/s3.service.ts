import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  AWS_S3_BUCKET = 'toy-store-2021';
  s3 = new AWS.S3({
    accessKeyId: 'AKIAWNMQUD72RRUDZJEA',
    secretAccessKey: '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',
  });

  async uploadFile(file) {
    const { originalname } = file;
    const fileLink = await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
    return fileLink;
  }

  async s3_upload(
    file: object,
    bucket: string,
    name: string,
    mimetype: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      return s3Response.Location;
    } catch (err) {
      throw new NotAcceptableException();
    }
  }
}
