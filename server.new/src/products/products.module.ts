import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products.model';
import { MediaModule } from 'src/media/media.module';
import { Media } from 'src/media/media.model';
import { ProductMedia } from './product-media.model';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    SequelizeModule.forFeature([Product, Media, ProductMedia]),
    MediaModule,
  ],
})
export class ProductsModule {}
