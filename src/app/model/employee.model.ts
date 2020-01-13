import {Department} from "./department.model";

export class Employee {
  id: number;
  department: Department;
  sex: boolean;
  employeeId: string;
  name: string;
  address: string;
  phone: string;
  dob: string;
  joinDate: string;
  photo: string;
  salaryRate: string;
  currentDayOff: string;


  constructor(id: number, department: Department, sex: boolean, employeeId: string, name: string, address: string, phone: string, dob: string, joinDate: string, photo: string, salaryRate: string, currentDayOff: string) {
    this.id = id;
    this.department = department;
    this.sex = sex;
    this.employeeId = employeeId;
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

