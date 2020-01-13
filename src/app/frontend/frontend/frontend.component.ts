import {Component, OnInit} from '@angular/core';
import {ChangePage} from "../../model/change-page.model";

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit {

  currentPage;
  id = 1;

  constructor() { }

  ngOnInit() {
    this.currentPage = 'home';
  }

  changePage(changePage: ChangePage) {
    this.currentPage = changePage.page;
    this.id = changePage.id;
    console.log(this.id);
  }

  isHomePage(): boolean{
    return this.currentPage == 'home' ? true : false;
  }

  isAboutUsPage(): boolean{
    return this.currentPage == 'aboutUs' ? true : false;
  }

  isCartPage(): boolean{
    return this.currentPage == 'cart' ? true : false;
  }

  isCheckoutPage(): boolean{
    return this.currentPage == 'checkout' ? true : false;
  }

  isConfirmationPage(): boolean{
    return this.currentPage == 'confirmation' ? true : false;
  }

  isDishDetailPage(): boolean{
    return this.currentPage == 'dishDetail' ? true : false;
  }

  isJobPage(): boolean{
    return this.currentPage == 'job' ? true : false;
  }

  isJobDetailPage(): boolean{
    return this.currentPage == 'jobDetail' ? true : false;
  }


  isReservationPage(): boolean{
    return this.currentPage == 'reservation' ? true : false;
  }

  isTrackPage(): boolean{
    return this.currentPage == 'track' ? true : false;
  }

  isAdminPage(): boolean{
    return this.currentPage == 'admin' ? true : false;
  }
}
