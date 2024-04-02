import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { MediaModule } from './media/media.module';
import { CartModule } from './cart/cart.module';
import { CartProductsModule } from './cart-products/cart-products.module';
import { Product } from './products/products.model';
import { Cart } from './cart/cart.model';
import { ProductMedia } from './products/product-media.model';
import { Media } from './media/media.model';
import { CartProduct } from './cart-products/cart-products.model';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TokenModule } from './token/token.module';
import { Token } from './token/token.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '/static'),
      serveStaticOptions: { index: false },
      serveRoot: '/static',
      // renderPath: path.join(__dirname, '..', '/static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Role,
        UserRoles,
        Product,
        Cart,
        ProductMedia,
        Media,
        CartProduct,
        Token,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ProductsModule,
    MediaModule,
    CartModule,
    CartProductsModule,
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
