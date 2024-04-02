import { Cart } from '../cart.model';

export class CartDto {
  id: number;
  totalQty: number;
  totalPrice: number;
  userId: number;

  constructor(cart: Cart) {
    this.id = cart.id;
    this.totalPrice = cart.totalPrice;
    this.totalQty = cart.totalQty;
    this.userId = cart.userId;
  }
}
