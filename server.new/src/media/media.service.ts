import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Media } from './media.model';
import { InjectModel } from '@nestjs/sequelize';

import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media) private mediaRepository: typeof Media) {}

  async createMedia(media: Array<Express.Multer.File>): Promise<Media[]> {
    try {
      const promises = media.map(async (file) => {
        const fileExtension =
          '.' + path.basename(file.originalname).split('.')[1];
        const fileName = uuid.v4() + fileExtension;
        const filePath = path.join('static', 'media');
        const fileLink = path.join(filePath, fileName);

        const dbMedia = await this.mediaRepository.create({
          extension: fileExtension,
          link: fileLink,
          size: file.size,
        });

        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }

        fs.writeFileSync(fileLink, file.buffer);

        return dbMedia;
      });

      return Promise.all(promises);
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
