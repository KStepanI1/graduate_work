import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Media } from './media.model';
import { Product } from 'src/products/products.model';

@Module({
  providers: [MediaService],
  exports: [MediaService],
  imports: [SequelizeModule.forFeature([Media, Product])],
})
export class MediaModule {}
