import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { CartProduct } from 'src/cart-products/cart-products.model';
import { User } from 'src/users/users.model';

interface CartCreationAttrs {
  userId: number;
}

@Table({ tableName: 'carts' })
export class Cart extends Model<Cart, CartCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  totalQty: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  totalPrice: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @HasMany(() => CartProduct)
  products: CartProduct[];

  @BelongsTo(() => User)
  user: User;
}
