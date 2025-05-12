import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CustomHttpException } from '../core/custom.http.exception';
import { errors } from '../error/error';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
dotenv.config();

export enum FolderAwsS3 {
  profile = 'profile',
}

@Injectable()
export class AwsS3Utils {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucketName = process.env.AWS_S3_BUCKET;
    const key = `${uuid()}-${file.originalname}`;

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await this.s3.send(command);

    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }

  async uploadBase64Avatar(data: {
    base64String: string;
    oldAvatarKey: string | null;
    folder: FolderAwsS3;
  }): Promise<string> {
    try {
      const matches = data.base64String.match(/^data:(.+);base64,(.+)$/);
      const extensions = data.base64String.split(';')[0].split('/')[1];
      if (!matches) {
        throw new CustomHttpException(errors.FAILED_CONVERT_DATA, {
          message: 'Invalid base64 string',
        });
      }

      const mimeType = matches[1];
      const buffer = Buffer.from(matches[2], 'base64');

      const bucketName = process.env.AWS_BUCKET_NAME;
      const newKey = `${data.folder}/${process.env.NODE_ENV}/${uuid()}.${extensions}`;

      if (data.oldAvatarKey) {
        const deleteParams = {
          Bucket: bucketName,
          Key: data.oldAvatarKey.replace(
            `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/`,
            '',
          ),
        };
        const deleteCommand = new DeleteObjectCommand(deleteParams);
        await this.s3.send(deleteCommand);
      }

      const uploadParams = {
        Bucket: bucketName,
        Key: newKey,
        Body: buffer,
        ContentType: mimeType,
      };
      const uploadCommand = new PutObjectCommand(uploadParams);
      await this.s3.send(uploadCommand); // Unggah file baru

      return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${newKey}`;
    } catch (error) {
      throw new CustomHttpException(errors.FAILED_CONVERT_DATA, {
        message: error.message,
      });
    }
  }
}
