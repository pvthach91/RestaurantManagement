import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartStorageService} from "../../services/cart-storage.service";
import {OrderItem} from "../../model/order-item.model";
import {configuration} from "../../model/configuration.model";
import {ChangePage} from "../../model/change-page.model";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  selector: 'app-frontend-header',
  templateUrl: './frontend-header.component.html',
  styleUrls: ['./frontend-header.component.css']
})
export class FrontendHeaderComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  displayCart: boolean = false;
  shoppingCart: Array<OrderItem>;

  @Input() currentPage: string;

  private configuration = configuration;

  constructor(private cartStorage: CartStorageService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.shoppingCart = this.cartStorage.getShoppingCart();
  }

  cartClick() : void {
    this.displayCart = !this.displayCart;
    if (this.displayCart) {
      this.shoppingCart = this.cartStorage.getShoppingCart();
    }
  }

  isHomePage(): boolean {
    return 'home' == this.currentPage ? true : false;
  }

  isCareerPage(): boolean {
    return 'career' == this.currentPage  ? true : false;
  }

  isAboutUsPage(): boolean {
    return 'about-us' == this.currentPage ? true : false;
  }

  isCartPage(): boolean {
    return 'cart' == this.currentPage ? true : false;
  }

  isTrackPage(): boolean {
    return 'track' == this.currentPage ? true : false;
  }

  goToHomePage() {
    let changePage: ChangePage = new ChangePage('home', null);
    this.currentPageEmit.emit(changePage);
  }

  goToAboutUsPage() {
    let changePage: ChangePage = new ChangePage('aboutUs', null);
    this.currentPageEmit.emit(changePage);
  }

  goToCartPage() {
    let changePage: ChangePage = new ChangePage('cart', null);
    this.currentPageEmit.emit(changePage);
  }

  goToCheckoutPage() {
    let changePage: ChangePage = new ChangePage('checkout', null);
    this.currentPageEmit.emit(changePage);
  }

  goToConfirmationPage(id: number) {
    let changePage: ChangePage = new ChangePage('confirmation', id);
    this.currentPageEmit.emit(changePage);
  }


  goToJobPage() {
    let changePage: ChangePage = new ChangePage('job', null);
    this.currentPageEmit.emit(changePage);
  }

  goToReservationPage() {
    let changePage: ChangePage = new ChangePage('reservation', null);
    this.currentPageEmit.emit(changePage);
  }

  goToTrackPage() {
    let changePage: ChangePage = new ChangePage('track', null);
    this.currentPageEmit.emit(changePage);
  }

  goToAdminPage() {
    if (this.tokenStorage.isLoggedIn()) {
      let defaultPage = this.tokenStorage.getDefaultPage();
      window.location.href = defaultPage;
    } else {
      let changePage: ChangePage = new ChangePage('admin', null);
      this.currentPageEmit.emit(changePage);
    }
  }

}
