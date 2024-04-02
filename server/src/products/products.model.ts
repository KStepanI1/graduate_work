import {
  BeforeBulkDestroy,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Media } from 'src/media/media.model';
import { ProductMedia } from './product-media.model';

interface ProductCreationAttrs {
  title: string;
  description?: string;
  price: number;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  rating: number;

  @BelongsToMany(() => Media, () => ProductMedia)
  media: Media[];

  @BeforeBulkDestroy
  static async methodName(instance, b) {
    try {
      const { id } = instance.where;

      const productMedia = await ProductMedia.findAll({
        where: { productId: id },
        include: { all: true },
      });

      productMedia.forEach(async (pm) => {
        Media.destroy({ where: { id: pm.mediaId } });
        pm.destroy();
      });
    } catch (e) {
      throw new Error('Не удалось удалить файл');
    }
  }
}
