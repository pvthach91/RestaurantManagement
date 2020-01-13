export class PayslipCriteriaSearch {
  payslipType: string;
  ref: string;
  currentPage: number;
  pageSize: number;


  constructor(payslipType: string, ref: string, currentPage: number, pageSize: number) {
    this.payslipType = payslipType;
    this.ref = ref;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}
