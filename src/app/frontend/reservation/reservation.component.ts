import {Component, OnInit} from '@angular/core';
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";
import {ReservationRequest} from "../../model/post/reservation-request.model";
import {ReservationService} from "../../services/reservation.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  form: any = {};
  fromDate: string;
  toDate: string;

  constructor(private reservationService: ReservationService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.form.seat = 1;
    this.form.time = 10;
    this.form.hour = 1;
  }

  onSubmit() {
    console.log(this.form.date)
    if (this.form.date == undefined || this.form.date == null) {
      return;
    }
    this.spinnerService.show();
    this.generateDateTime();
    let reservation: ReservationRequest = new ReservationRequest(this.fromDate, this.toDate, this.form.name, this.form.email, this.form.phone, this.form.seat);
    this.reservationService.create(reservation).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          console.log(data.data);
          this.toastr.success("Reserved successfully, please check your email", "Success");
        } else {
          this.toastr.error(data.message, 'Error');
        }
      },
      error => {
        this.spinnerService.hide();
        console.log(error);
        this.toastr.error("Fail to reserve", 'Error');
      }
    );

  }

  generateDateTime() {
    let from = parseInt(this.form.time);
    let to = from + parseInt(this.form.hour);
    let date = this.form.date;
    let d: Date = new Date(date);
    let formatted_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    this.fromDate = formatted_date + " " + from + ":00:00";
    this.toDate = formatted_date + " " + to + ":00:00";
    console.log(this.fromDate);
    console.log(this.toDate);
  }

}
