import { Injectable } from '@angular/core';
import {Dish} from "../model/dish.model";
import {OrderItem} from "../model/order-item.model";

const SHOPPING_CART_KEY = 'FoodProducerShoppingCart';

@Injectable({
  providedIn: 'root'
})
export class CartStorageService {

  constructor() { }

  public saveShoppingCart(cartItems: Array<OrderItem>) {
    window.sessionStorage.removeItem(SHOPPING_CART_KEY);
    window.sessionStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(cartItems));
  }

  public getShoppingCart(): Array<OrderItem> {
     let shoppingCartJson = sessionStorage.getItem(SHOPPING_CART_KEY);
     // console.log(shoppingCartJson);
     if (shoppingCartJson == undefined || shoppingCartJson == null) {
       let items: Array<OrderItem> = new Array<OrderItem>();
       return items;
     } else {
       let shoppingCart: Array<OrderItem> = JSON.parse(shoppingCartJson);
       return shoppingCart;
     }
  }

  public remove(){
    window.sessionStorage.removeItem(SHOPPING_CART_KEY);
  }


  public addItem(dish: Dish, quantity: number) : boolean {
    let result = false;
    let shoppingCart: Array<OrderItem> = this.getShoppingCart();

    if (shoppingCart.length == 0) {
      let cartItem = new OrderItem(dish, quantity);
      let items: Array<OrderItem> = new Array<OrderItem>();
      items.push(cartItem);
      this.saveShoppingCart(items);
      result = true;
    } else {
      // console.log(shoppingCart);
      let exist = false;
      shoppingCart.forEach((cart, index) => {
        if (cart.dish.id == dish.id) {
          exist = true;
          cart.quantity += quantity;
        }
      });
      if (!exist) {
        let cartItem = new OrderItem(dish, quantity);
        shoppingCart.push(cartItem);
      }

      this.saveShoppingCart(shoppingCart);
      result = true;
    }

    return result;
  }

  public removeItem(dishId: number) : void {
    let shoppingCart: Array<OrderItem> = this.getShoppingCart();
    let index = -1;
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].dish.id == dishId) {
        index = i;
      }
    }
    if (index >= 0) {
      shoppingCart.splice(index, 1);
      this.saveShoppingCart(shoppingCart);
    }
  }

}
