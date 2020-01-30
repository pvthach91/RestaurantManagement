import {Component, OnInit} from '@angular/core';
import {configuration} from "../../model/configuration.model";
import {OrderItem} from "../../model/order-item.model";
import {CartStorageService} from "../../services/cart-storage.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private configuration = configuration;
  shoppingCart: Array<OrderItem>;
  totalPrice: number;

  constructor(private cartStorage: CartStorageService) { }

  ngOnInit() {
    this.updateCart();
  }

  updateCart() {
    this.shoppingCart = this.cartStorage.getShoppingCart();
    this.totalPrice = 0;
    this.shoppingCart.forEach((cartItem, index) => {
      let rowPrice = cartItem.quantity*cartItem.dish.price;
      this.totalPrice += rowPrice;
    });
  }

  trackByFn(index, item) {
    return item.dish.id;
  }

  increaseQuantity(cartItem: OrderItem): void {
    this.cartStorage.addItem(cartItem.dish, 1);
    this.updateCart();
  }

  decreaseQuantity(cartItem: OrderItem): void {
    console.log(cartItem.quantity);
    if (cartItem.quantity > 1) {
      this.cartStorage.addItem(cartItem.dish, - 1);
      this.updateCart();
    }
  }

  removeItem(dishId: number): void {
    this.cartStorage.removeItem(dishId);
    this.updateCart();
  }

}
