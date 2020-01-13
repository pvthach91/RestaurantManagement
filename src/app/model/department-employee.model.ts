import {Employee} from "./employee.model";

export class DepartmentEmployee {
  id: number;
  name: string;
  employees: Array<Employee>;


  constructor(id: number, name: string, employees: Array<Employee>) {
    this.id = id;
    this.name = name;
    this.employees = employees;
  }
}
