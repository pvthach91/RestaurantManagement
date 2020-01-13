import {Timesheet} from "./timesheet.model";

export class PayrollItem {
  id: number;
  ref: Timesheet;
  salaryPerDay: number;


  constructor(id: number, ref: Timesheet, salaryPerDay: number) {
    this.id = id;
    this.ref = ref;
    this.salaryPerDay = salaryPerDay;
  }
}

