import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ReportCriteriaSearch} from "../model/report-criteria-search.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getReports(criteria: ReportCriteriaSearch): Observable<Page> {
    const url = configuration.host + '/api/reports';
    return this.http.post<Page>(url, criteria, httpOptions);
  }
}
