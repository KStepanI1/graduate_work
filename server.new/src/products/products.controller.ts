import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('media'))
  async createProduct(
    @Body() dto: CreateProductDto,
    @UploadedFiles() media: Array<Express.Multer.File>,
  ) {
    return this.productService.createProduct(dto, media);
  }

  @Get()
  async getAll(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.productService.getAll({ limit, offset });
  }

  @Get('/:id')
  async getById(@Param('id') id) {
    return this.productService.getById(id);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
