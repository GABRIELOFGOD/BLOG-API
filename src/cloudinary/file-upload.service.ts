import { Injectable } from '@nestjs/common';// Import the interface
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryUploadResult } from 'src/utils';

@Injectable()
export class FileUploadService {
  constructor(private readonly cloudinaryProvider: CloudinaryProvider) {}

  async uploadImage(file: Express.Multer.File): Promise<CloudinaryUploadResult> {
    return await this.cloudinaryProvider.uploadImage(file);
  }
}
