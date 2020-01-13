import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {TimesheetCriteriaSearch} from "../model/timesheet-criteria-search.model";
import {TimesheetRequest} from "../model/post/timesheet-request.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getTimesheets(criteria: TimesheetCriteriaSearch): Observable<Page> {
    const url = configuration.host + '/api/timesheets/';
    return this.http.post<Page>(url, criteria, httpOptions);
  }

  getTimesheet(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/timesheet/' + id;
    return this.http.get<ApiResponse>(url);
  }

  create(timesheet: TimesheetRequest): Observable<ApiResponse> {
    const url = configuration.host + '/api/timesheet/create';
    return this.http.post<ApiResponse>(url, timesheet, httpOptions);
  }

  edit(timesheet: TimesheetRequest): Observable<ApiResponse> {
    const url = configuration.host + '/api/timesheet/edit';
    return this.http.post<ApiResponse>(url, timesheet, httpOptions);
  }

  approve(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/timesheet/approve/' + id;
    return this.http.post<ApiResponse>(url, httpOptions);
  }

  cancel(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/timesheet/cancel/' + id;
    return this.http.post<ApiResponse>(url, httpOptions);
  }

  deleteTimesheet(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/timesheet/delete/' + id;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

}
