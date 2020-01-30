import {Component, OnInit} from '@angular/core';
import {CartStorageService} from "../../services/cart-storage.service";
import {configuration} from "../../model/configuration.model";
import {OrderItem} from "../../model/order-item.model";
import {OrderRequest} from "../../model/post/order-request.model";
import {OrderItemRequest} from "../../model/post/order-item-request.model";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";
import {OrderService} from "../../services/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  private configuration = configuration;
  shoppingCart: Array<OrderItem>;
  totalPrice: number;

  form: any = {};

  constructor(private cartStorage: CartStorageService,
              private orderService: OrderService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService,
              private router: Router) { }

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

  onSubmit() {
    if (this.shoppingCart.length < 1) {
      this.toastr.error("No items selected", "Warning");
    } else {
      // console.log(JSON.stringify(this.getOrderRequest()));
      this.orderService.create(this.getOrderRequest()).subscribe(
        data => {
          if (data.success) {
            this.cartStorage.remove();
            this.goToConfirmationPage(data.data);
          } else {
            this.toastr.error(data.message, 'Error');
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getOrderRequest(): OrderRequest {
    let orderBy = this.form.name;
    let email = this.form.email;
    let phone = this.form.phone;
    let address = this.form.address;

    let items: Array<OrderItemRequest> = new Array<OrderItemRequest>();
    this.shoppingCart.forEach((orderItem, index) => {
      let oir: OrderItemRequest = new OrderItemRequest(orderItem.dish.id, orderItem.quantity);
      items.push(oir);
    });

    let orderRequest: OrderRequest = new OrderRequest(orderBy, email, phone, address, this.totalPrice, items);

    return orderRequest;
  }

  goToConfirmationPage(id: number) {
    this.router.navigate(['/confirmation', id]);
  }

}
