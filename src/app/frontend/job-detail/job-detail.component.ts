import {Component, OnInit} from '@angular/core';
import {JobService} from "../../services/job.service";
import {Job} from "../../model/job.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  job: Job;
  id: number;

  constructor(private route: ActivatedRoute,
              private jobService: JobService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == null || this.id == undefined) {
        // Load error page
      } else {
        // Load detail page
        this.jobService.getJob(this.id).subscribe(
          data => {
            this.job = data.data;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

}
