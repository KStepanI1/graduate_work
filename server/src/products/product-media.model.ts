import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Media } from 'src/media/media.model';
import { Product } from './products.model';

@Table({ tableName: 'products_media', createdAt: false, updatedAt: false })
export class ProductMedia extends Model<ProductMedia> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => Product)
  productId: number;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => Media)
  mediaId: number;
}
