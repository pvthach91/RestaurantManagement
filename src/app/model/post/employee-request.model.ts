export class EmployeeRequest {
  id: number;
  departmentId: number;
  sex: boolean;
  name: string;
  address: string;
  phone: string;
  dob: string;
  joinDate: string;
  photo: string;
  salaryRate: string;
  currentDayOff: string;


  constructor(id: number, departmentId: number, sex: boolean, name: string, address: string, phone: string, dob: string, joinDate: string, photo: string, salaryRate: string, currentDayOff: string) {
    this.id = id;
    this.departmentId = departmentId;
    this.sex = sex;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.dob = dob;
    this.joinDate = joinDate;
    this.photo = photo;
    this.salaryRate = salaryRate;
    this.currentDayOff = currentDayOff;
  }
}

