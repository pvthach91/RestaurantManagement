import {Employee} from "./employee.model";

export class Leaving {
  id: number;
  employee: Employee;
  fromDate: string;
  toDate: string;
  status: string;
  dayOff: number;

  constructor(id: number, employee: Employee, fromDate: string, toDate: string, status: string, dayOff: number) {
    this.id = id;
    this.employee = employee;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.status = status;
    this.dayOff = dayOff;
  }
}

