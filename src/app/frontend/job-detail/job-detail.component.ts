import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobService} from "../../services/job.service";
import {Job} from "../../model/job.model";
import {ChangePage} from "../../model/change-page.model";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  job: Job;
  @Input() id: number;

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobService.getJob(this.id).subscribe(
      data => {
        this.job = data.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  changePage(changePage: ChangePage) {
    this.goToPage(changePage);
  }
  goToPage(changePage: ChangePage) {
    this.currentPageEmit.emit(changePage);
  }

  goToJobPage() {
    let changePage: ChangePage = new ChangePage('job', null);
    this.currentPageEmit.emit(changePage);
  }

}
