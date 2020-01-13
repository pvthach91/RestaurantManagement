import { Component, OnInit } from '@angular/core';
import {ChangePage} from "../../../model/change-page.model";
import {TokenStorageService} from "../../../auth/token-storage.service";

@Component({
  selector: 'app-hr-management',
  templateUrl: './hr-management.component.html',
  styleUrls: ['./hr-management.component.css']
})
export class HrManagementComponent implements OnInit {

  currentPage;
  id = 1;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if(!this.tokenStorage.hasHRRole()) {
      window.location.href = 'management/403';
      return;
    }
    this.currentPage = 'employee';
  }

  changePage(changePage: ChangePage) {
    console.log(changePage);
    this.id = changePage.id;
    this.currentPage = changePage.page;
  }

  isEmployeePage(): boolean{
    return this.currentPage == 'employee' ? true : false;
  }

  isLeavePage(): boolean{
    return this.currentPage == 'leave' ? true : false;
  }

  isJobPage(): boolean{
    return this.currentPage == 'job' ? true : false;
  }

  isTimesheetPage(): boolean{
    return this.currentPage == 'timesheet' ? true : false;
  }
}
