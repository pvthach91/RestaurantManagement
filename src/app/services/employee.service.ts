import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {EmployeeRequest} from "../model/post/employee-request.model";
import {EmployeeCriteriaSearch} from "../model/employee-criteria-search.model";
import {Employee} from "../model/employee.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getEmployees(criteriaSearch: EmployeeCriteriaSearch): Observable<Page> {
    const url = configuration.host + '/api/employees/';
    return this.http.post<Page>(url, criteriaSearch, httpOptions);
  }

  getAllEmployees(): Observable<Array<Employee>> {
    const url = configuration.host + '/api/allEmployees/';
    return this.http.get<Array<Employee>>(url, httpOptions);
  }

  getEmployee(jobId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/employee/' + jobId;
    return this.http.get<ApiResponse>(url);
  }

  create(employee: EmployeeRequest): Observable<ApiResponse> {
    const url = configuration.host + '/api/employee/create';
    return this.http.post<ApiResponse>(url, employee, httpOptions);
  }

  edit(employee: EmployeeRequest): Observable<ApiResponse> {
    const url = configuration.host + '/api/employee/edit';
    return this.http.post<ApiResponse>(url, employee, httpOptions);
  }

  deleteEmployee(jobId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/employee/delete/' + jobId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

}
