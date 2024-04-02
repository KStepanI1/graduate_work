import { Product } from './../products/products.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { CartProduct } from 'src/cart-products/cart-products.model';
import { CartDto } from './dto/cart.dto';
import { Media } from 'src/media/media.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private cartRepository: typeof Cart,
    @InjectModel(CartProduct) private cartProductRepository: typeof CartProduct,
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}

  async get(userId: number) {
    const cart = await this.cartRepository.findOne({
      where: { userId },
      include: {
        model: CartProduct,
        include: [{ model: Product, include: [Media] }],
      },
    });

    if (!cart) {
      const newCart = await this.cartRepository.create({ userId });

      return newCart;
    }

    return cart;
  }

  async addProduct(userId: number, productId: number) {
    let cart = await this.createIfNotExists(userId);

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new BadRequestException('Товара с таким id не существует');
    }

    let cartProduct = await this.cartProductRepository.findOne({
      where: { productId, cartId: cart.id },
    });

    if (!cartProduct) {
      cartProduct = await this.cartProductRepository.create({
        productId,
        cartId: cart.id,
      });
    }

    cartProduct = await this.calculateCartProduct(
      cart.id,
      productId,
      cartProduct.qty + 1,
    );

    await cart.$add<CartProduct>('products', cartProduct);
    cart = await this.calculateCart(cart.id);

    const products = this.getCartProducts(cart);

    return { totalQty: cart.totalQty, products };
  }

  async deleteProduct(userId: number, productId: number) {
    let cart = await this.createIfNotExists(userId);

    const cartProduct = await this.cartProductRepository.findOne({
      where: { productId, cartId: cart.id },
    });

    const qty = cartProduct.qty <= 1 ? 0 : cartProduct.qty - 1;

    if (qty === 0) {
      cartProduct.destroy();
    } else {
      await this.calculateCartProduct(cart.id, productId, qty);
    }

    cart = await this.calculateCart(cart.id);

    const products = this.getCartProducts(cart);

    return { totalQty: cart.totalQty, products };
  }

  async init(userId: number) {
    let cart = await this.createIfNotExists(userId);

    cart = await this.calculateCart(cart.id);

    const products = this.getCartProducts(cart);

    return { totalQty: cart.totalQty, products };
  }

  private getCartProducts(cart: Cart) {
    return (
      cart.products?.map((cartProduct) => {
        return {
          id: cartProduct.productId,
          qty: cartProduct.qty,
        };
      }) ?? []
    );
  }

  private async createIfNotExists(userId: number) {
    let cart = await this.cartRepository.findOne({
      where: { userId },
      include: { model: CartProduct },
    });

    if (!cart) {
      cart = await this.cartRepository.create({
        userId,
      });
    }

    return cart;
  }

  private async calculateCart(id: number) {
    const cart = await this.cartRepository.findOne({
      where: { id },
      include: { model: CartProduct },
    });

    if (!cart) return null;

    cart.totalQty = cart.products?.reduce((a, b) => a + +b.qty, 0);
    cart.totalPrice = cart.products?.reduce((a, b) => a + b.price, 0);
    const res = await cart.save();

    return res;
  }

  private async calculateCartProduct(
    cartId: number,
    productId: number,
    qty: number,
  ) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    const cartProduct = await this.cartProductRepository.findOne({
      where: { productId, cartId },
    });

    if (!cartProduct || !product) {
      throw new BadRequestException('Товар с таким id не существует');
    }

    cartProduct.price = product.price;
    cartProduct.qty = qty;
    cartProduct.totalPrice = qty * product.price;
    const res = await cartProduct.save();

    return res;
  }
}
