import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { CartProduct } from 'src/cart-products/cart-products.model';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from 'src/products/products.model';
import { TokenModule } from 'src/token/token.module';

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports: [
    SequelizeModule.forFeature([Cart, CartProduct, User, Product]),
    TokenModule,
  ],
})
export class CartModule {}
