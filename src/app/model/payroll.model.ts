import {PayrollItem} from "./payroll-item.model";
import {Employee} from "./employee.model";

export class Payroll {
  id: number;
  employee: Employee;
  forYear: number;
  forMonth: number;
  totalSalary: number;
  items: Array<PayrollItem>;


  constructor(id: number, employee: Employee, forYear: number, forMonth: number, totalSalary: number, items: Array<PayrollItem>) {
    this.id = id;
    this.employee = employee;
    this.forYear = forYear;
    this.forMonth = forMonth;
    this.totalSalary = totalSalary;
    this.items = items;
  }
}

