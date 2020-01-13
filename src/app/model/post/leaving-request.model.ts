export class LeavingRequest {
  id: number;
  employeeId: number;
  fromDate: string;
  toDate: string;
  dayOff: number;


  constructor(id: number, employeeId: number, fromDate: string, toDate: string, dayOff: number) {
    this.id = id;
    this.employeeId = employeeId;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.dayOff = dayOff;
  }
}

