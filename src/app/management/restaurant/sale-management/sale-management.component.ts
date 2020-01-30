import { Component, OnInit } from '@angular/core';
import {ChangePage} from "../../../model/change-page.model";
import {TokenStorageService} from "../../../auth/token-storage.service";

@Component({
  selector: 'app-sale-management',
  templateUrl: './sale-management.component.html',
  styleUrls: ['./sale-management.component.css']
})
export class SaleManagementComponent implements OnInit {

  currentPage;
  id = 1;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if(!this.tokenStorage.hasSaleRole()) {
      window.location.href = 'management/403';
      return;
    }
    this.currentPage = 'dish';
  }

  changePage(changePage: ChangePage) {
    console.log(changePage);
    this.id = changePage.id;
    this.currentPage = changePage.page;
  }

  isDishPage(): boolean{
    return this.currentPage == 'dish' ? true : false;
  }

  isOrderPage(): boolean{
    return this.currentPage == 'order' ? true : false;
  }

  isOrderDetailPage(): boolean{
    return this.currentPage == 'orderDetail' ? true : false;
  }

  isReservationPage(): boolean{
    return this.currentPage == 'reservation' ? true : false;
  }

}
