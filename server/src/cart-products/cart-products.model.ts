import {
  AfterCreate,
  AfterDestroy,
  BeforeBulkDestroy,
  BeforeCreate,
  BeforeDestroy,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Media } from 'src/media/media.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

import * as fs from 'fs';
import * as path from 'path';
import { Cart } from 'src/cart/cart.model';
import { Product } from 'src/products/products.model';

interface CartProductCreationAttrs {
  qty?: number;
  price?: number;
  totalPrice?: number;
  productId: number;
  cartId: number;
}

@Table({ tableName: 'cart_products' })
export class CartProduct extends Model<CartProduct, CartProductCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  qty: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  totalPrice: number;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
  })
  cartId: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  productId: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @BelongsTo(() => Product)
  product: Product;
}
