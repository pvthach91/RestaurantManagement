import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SimpleModalService} from "ngx-simple-modal";
import {configuration} from "../../../model/configuration.model";
import {Employee} from "../../../model/employee.model";
import {EmployeeService} from "../../../services/employee.service";
import {EmployeeCriteriaSearch} from "../../../model/employee-criteria-search.model";
import {EmployeeFormComponent} from "./employee-form/employee-form.component";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ChangePage} from "../../../model/change-page.model";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  form: any = {};
  employees: Array<Employee> = new Array<Employee>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  private configuration = configuration;

  constructor(private SimpleModalService: SimpleModalService,
              private employeeService: EmployeeService,
              private tokenStorage: TokenStorageService) {}

  ngOnInit() {
    this.search(1);
    this.form.department = "";
  }

  onSubmit() {
    this.search(1);
  }

  showDialog(isNew: boolean, employee: Employee) {
    this.SimpleModalService.addModal(EmployeeFormComponent, {
      isNewAction: isNew,
      employee: employee})
      .subscribe((message) => {
        if (message != undefined && message != null && message == "refresh") {
          this.search(this.currentPage);
        }
      });
  }

  search(page: number) {
    let ecs = new EmployeeCriteriaSearch(this.form.name, this.form.department, page, configuration.pageSizeGrid);
    this.employeeService.getEmployees(ecs).subscribe(
      data => {
        this.employees = data.data;
        this.currentPage = data.current;
        this.totalPage = data.total;
        this.makePages();
      },
      error => {
        console.log(error);
      }
    );
  }

  makePages() {
    this.pages = new Array<number>();
    if (this.totalPage < 1) {
      // do nothing
    } else {
      for (var i = 1; i <= this.totalPage; i++) {
        this.pages.push(i);
      }
    }
  }

  gotoPage(page: number) {
    if(page <1) {
      page = 1;
    }
    this.search(page);
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.href = 'auth/login';
  }

  goToLeavePage() {
    let changePage: ChangePage = new ChangePage('leave', null);
    this.currentPageEmit.emit(changePage);
  }

  goToJobPagePage(id: number) {
    let changePage: ChangePage = new ChangePage('job', id);
    this.currentPageEmit.emit(changePage);
  }

  goToTimesheetPage() {
    let changePage: ChangePage = new ChangePage('timesheet', null);
    this.currentPageEmit.emit(changePage);
  }

}
