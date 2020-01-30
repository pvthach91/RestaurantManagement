import { Component, OnInit } from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";
import {Receipt} from "../../../../model/receipt.model";
import {ReceiptService} from "../../../../services/receipt.service";
import {ReceiptRequest} from "../../../../model/post/receipt-request.model";

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.css']
})
export class ReceiptFormComponent extends SimpleModalComponent<ReceiptDialogModel, string> implements OnInit, ReceiptDialogModel {

  isNew: boolean = true;
  form: any = {};
  receipt: Receipt;
  isNewAction: boolean;

  constructor(private receiptService: ReceiptService,
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
    let receipt = new ReceiptRequest(
      this.form.receiptType,
      null,
      this.form.totalPrice,
      this.form.createdBy);
    this.receiptService.create(receipt).subscribe(
      data => {
        if (data.success) {
          this.apply();
        } else {
          this.toastr.error(data.message, 'Error');
        }
      },
      error => {
        this.toastr.error('Failed to create receipt', 'Error');
      }
    );
  }

  initData() : void {
    if (!this.isNew) {
      this.form.id = this.receipt.id;
      this.form.receiptType = this.receipt.receiptType;
      this.form.ref = this.receipt.ref;
      this.form.totalPrice = this.receipt.totalPrice;
      this.form.createdBy = this.receipt.createdBy;
      this.form.dateCreated = this.receipt.dateCreated;
    }
  }
}

export interface ReceiptDialogModel {
  isNewAction: boolean;
  receipt: Receipt;
}

