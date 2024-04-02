import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  readonly description?: string;
  @IsNotEmpty()
  readonly price: number;
}
