import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './cloudinary.provider';
import { FileUploadService } from './file-upload.service';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryProvider, FileUploadService],
  exports: [CloudinaryProvider, FileUploadService],
})
export class CloudinaryModule {}
