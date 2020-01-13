import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {PayrollCriteriaSearch} from "../model/payroll-criteria-search.model";
import {PayrollRequest} from "../model/post/payroll-request.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getPayrolls(criteria: PayrollCriteriaSearch): Observable<Page> {
    const url = configuration.host + '/api/payrolls/';
    return this.http.post<Page>(url, criteria, httpOptions);
  }

  getPayroll(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/payroll/' + id;
    return this.http.get<ApiResponse>(url);
  }

  create(payroll: PayrollRequest): Observable<ApiResponse> {
    const url = configuration.host + '/api/payroll/create';
    return this.http.post<ApiResponse>(url, payroll, httpOptions);
  }


  deletePayroll(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/payroll/delete/' + id;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

}
