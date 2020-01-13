export class ReservationCriteriaSearch {
  reservationId: string;
  status: string;
  currentPage: number;
  pageSize: number;


  constructor(reservationId: string, status: string, currentPage: number, pageSize: number) {
    this.reservationId = reservationId;
    this.status = status;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}
