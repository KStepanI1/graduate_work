import { Module } from '@nestjs/common';
import { CartProductsService } from './cart-products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from 'src/cart/cart.model';
import { CartProduct } from './cart-products.model';
import { Product } from 'src/products/products.model';

@Module({
  providers: [CartProductsService],
  imports: [SequelizeModule.forFeature([Cart, CartProduct, Product])],
})
export class CartProductsModule {}
