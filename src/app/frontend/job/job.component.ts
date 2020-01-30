import {Component, OnInit} from '@angular/core';
import {JobService} from "../../services/job.service";
import {Job} from "../../model/job.model";
import {configuration} from "../../model/configuration.model";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  jobs: Array<Job> = new Array<Job>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.search(1);
  }

  search(page: number) {
    this.jobService.getJobs(page, configuration.pageSize).subscribe(
      data => {
        this.jobs = data.data;
        this.currentPage = data.current;
        this.totalPage = data.total;
        this.makePages();
      },
      error => {
        console.log(error);
      }
    );
  }

  makePages() {
    this.pages = new Array<number>();
    if (this.totalPage < 1) {
      // do nothing
    } else {
      for (var i = 1; i <= this.totalPage; i++) {
        this.pages.push(i);
      }
    }
  }

  gotoPage(page: number) {
    if(page <1) {
      page = 1;
    }
    this.search(page);
  }

}
