export class EmployeeCriteriaSearch {
  name: string;
  department: number;
  currentPage: number;
  pageSize: number;


  constructor(name: string, department: number, currentPage: number, pageSize: number) {
    this.name = name;
    this.department = department;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}
