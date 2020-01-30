import { Component, OnInit } from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";
import {Payslip} from "../../../../model/payslip.model";
import {PayslipService} from "../../../../services/payslip.service";
import {PayslipRequest} from "../../../../model/post/payslip-request.model";

@Component({
  selector: 'app-payslip-form',
  templateUrl: './payslip-form.component.html',
  styleUrls: ['./payslip-form.component.css']
})
export class PayslipFormComponent extends SimpleModalComponent<PayslipDialogModel, string> implements OnInit, PayslipDialogModel {

  isNew: boolean = true;
  form: any = {};
  payslip: Payslip;
  isNewAction: boolean;

  constructor(private payslipService: PayslipService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService) {
    super();
  }

  ngOnInit() {
    this.isNew = this.isNewAction;
    this.initData();
  }

  apply() {
    this.result = 'refresh';
    this.close();
  }

  onSubmit() {
    let payslip = new PayslipRequest(
      this.form.payslipType,
      null,
      this.form.totalPrice,
      this.form.createdBy);
    this.payslipService.create(payslip).subscribe(
      data => {
        if (data.success) {
          this.apply();
        } else {
          this.toastr.error(data.message, 'Error');
        }
      },
      error => {
        this.toastr.error('Failed to create payslip', 'Error');
      }
    );
  }

  initData() : void {
    if (!this.isNew) {
      this.form.id = this.payslip.id;
      this.form.payslipType = this.payslip.payslipType;
      this.form.ref = this.payslip.ref;
      this.form.totalPrice = this.payslip.totalPrice;
      this.form.createdBy = this.payslip.createdBy;
      this.form.dateCreated = this.payslip.dateCreated;
    }
  }
}

export interface PayslipDialogModel {
  isNewAction: boolean;
  payslip: Payslip;
}


