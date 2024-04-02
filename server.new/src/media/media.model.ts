import {
  BeforeBulkDestroy,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductMedia } from 'src/products/product-media.model';
import { Product } from 'src/products/products.model';
import * as fs from 'fs';
import * as path from 'path';

interface MediaCreationAttrs {
  link: string;
  size?: number;
  extension: string;
}

@Table({ tableName: 'media' })
export class Media extends Model<Media, MediaCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  link: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  size: number;

  @Column({ type: DataType.STRING, allowNull: false })
  extension: string;

  @BelongsToMany(() => Product, () => ProductMedia)
  product: Product[];

  @BeforeBulkDestroy
  static async afterDestroy(instance) {
    const media = await Media.findOne({ where: instance.where });

    try {
      fs.unlinkSync(path.resolve(media.link));
    } catch (e) {
      return null;
    }
  }
}
