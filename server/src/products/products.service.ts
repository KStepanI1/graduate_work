import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';
import { MediaService } from 'src/media/media.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Media } from 'src/media/media.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    private mediaService: MediaService,
  ) {}

  async createProduct(
    prduct: CreateProductDto,
    media: Array<Express.Multer.File>,
  ) {
    try {
      const dbProduct = await this.productRepository.create(prduct);

      const dbMedia = await this.mediaService.createMedia(media);

      await dbProduct.$set(
        'media',
        dbMedia.map((dm) => dm.id),
      );
      dbProduct.media = dbMedia;

      return dbProduct;
    } catch (e) {
      throw new HttpException(
        'Ошибка создания товара',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll({ limit, offset }: { limit: number; offset: number }) {
    const products = await this.productRepository.findAndCountAll({
      include: [{ model: Media }],
      distinct: true,
      limit,
      offset,
    });
    return products;
  }

  async getById(id: number) {
    return await this.productRepository.findByPk(id, {
      include: { all: true },
    });
  }

  async deleteProduct(id: number) {
    return await this.productRepository.destroy({ where: { id } });
  }
}
