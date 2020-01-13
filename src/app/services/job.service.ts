import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {JobRequest} from "../model/post/job-request.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getJobs(currentPage: number, pageSize: number): Observable<Page> {
    const url = configuration.host + '/api/guest/jobs/' + currentPage + '/' + pageSize;
    return this.http.get<Page>(url, httpOptions);
  }

  getJob(jobId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/guest/job/' + jobId;
    return this.http.get<ApiResponse>(url);
  }

  create(job: JobRequest): Observable<ApiResponse> {
    const url = configuration.host + '/api/job/create';
    return this.http.post<ApiResponse>(url, job, httpOptions);
  }

  deleteJob(jobId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/job/delete/' + jobId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

}
