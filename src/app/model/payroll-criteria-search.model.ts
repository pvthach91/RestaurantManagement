export class PayrollCriteriaSearch {
  employeeId: string;
  forYear: number;
  forMonth: number;
  currentPage: number;
  pageSize: number;
  sort: number;


  constructor(employeeId: string, forYear: number, forMonth: number, currentPage: number, pageSize: number, sort: number) {
    this.employeeId = employeeId;
    this.forYear = forYear;
    this.forMonth = forMonth;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.sort = sort;
  }
}
