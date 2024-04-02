import {
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/token/guards/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@Request() req) {
    const user = await req.user;

    return this.cartService.get(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addProduct(@Query('productId') productId, @Req() req) {
    const user = await req.user;

    return this.cartService.addProduct(user.id, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteProduct(@Query('productId') productId: number, @Req() req) {
    const user = await req.user;

    return this.cartService.deleteProduct(user.id, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/init')
  async initCart(@Req() req) {
    const user = await req.user;

    return this.cartService.init(user.id);
  }
}
