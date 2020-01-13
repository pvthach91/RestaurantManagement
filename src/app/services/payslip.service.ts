import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {PayslipCriteriaSearch} from "../model/payslip-criteria-search.model";
import {PayslipRequest} from "../model/post/payslip-request.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PayslipService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getPayslips(criteria: PayslipCriteriaSearch): Observable<Page> {
    const url = configuration.host + '/api/payslips/';
    return this.http.post<Page>(url, criteria, httpOptions);
  }

  getPayslip(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/payslip/' + id;
    return this.http.get<ApiResponse>(url);
  }

  create(payslip: PayslipRequest): Observable<ApiResponse> {
    const url = configuration.host + '/api/payslip/create';
    return this.http.post<ApiResponse>(url, payslip, httpOptions);
  }


  deletePayslip(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/payslip/delete/' + id;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

}
