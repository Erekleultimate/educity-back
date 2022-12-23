import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  async uploadUserImage(email: string, image: object): Promise<string> {
    const imageLink = 'imageLink'; // TODO: upload image to amazon s3 bucket and asign link string
    return imageLink;
  }
}
