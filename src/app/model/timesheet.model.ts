import {Employee} from "./employee.model";

export class Timesheet {
  id: number;
  employee: Employee;
  dateCreated: string;
  workingHour: number;
  forDate: string;
  status: string;
  timesheetType: string;


  constructor(id: number, employee: Employee, dateCreated: string, workingHour: number, forDate: string, status: string, timesheetType: string) {
    this.id = id;
    this.employee = employee;
    this.dateCreated = dateCreated;
    this.workingHour = workingHour;
    this.forDate = forDate;
    this.status = status;
    this.timesheetType = timesheetType;
  }
}

