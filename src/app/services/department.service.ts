import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {configuration} from "../model/configuration.model";
import {Department} from "../model/department.model";
import {DepartmentEmployee} from "../model/department-employee.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Array<Department>> {
    const url = configuration.host + '/api/departments';
    return this.http.get<Array<Department>>(url, httpOptions);
  }

  getDepartmentsWithEmployees(): Observable<Array<DepartmentEmployee>> {
    const url = configuration.host + '/api/departmentsWithEmployees';
    return this.http.get<Array<DepartmentEmployee>>(url, httpOptions);
  }

}
