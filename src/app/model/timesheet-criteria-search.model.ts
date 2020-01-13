export class TimesheetCriteriaSearch {
  employeeName: string;
  status: number;
  currentPage: number;
  pageSize: number;


  constructor(employeeName: string, status: number, currentPage: number, pageSize: number) {
    this.employeeName = employeeName;
    this.status = status;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}
