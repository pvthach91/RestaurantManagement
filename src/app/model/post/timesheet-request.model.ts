export class TimesheetRequest {
  id: number;
  employeeId: number;
  workingHour: number;
  forDate: string;


  constructor(id: number, employeeId: number, workingHour: number, forDate: string) {
    this.id = id;
    this.employeeId = employeeId;
    this.workingHour = workingHour;
    this.forDate = forDate;
  }
}

