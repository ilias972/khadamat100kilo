import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import type { Express } from 'express';

@Injectable()
export class UploadService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'khadamat',
          transformation: [
            { width: 1000, height: 1000, crop: 'limit' },
            { quality: 'auto' },
          ],
        },
        (error, result) => {
          if (error) {
            reject(
              new HttpException(
                'Upload failed',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          } else if (result) {
            resolve(result.secure_url);
          } else {
            reject(
              new HttpException(
                'Upload failed',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          }
        },
      );
      uploadStream.end(file.buffer);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error) => {
        if (error) {
          reject(
            new HttpException(
              'Delete failed',
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        } else {
          resolve();
        }
      });
    });
  }
}
