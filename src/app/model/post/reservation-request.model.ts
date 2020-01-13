export class ReservationRequest {
  from: string;
  to: string;
  reserveBy: string;
  email: string;
  phone: string;
  seat: number;


  constructor(from: string, to: string, reserveBy: string, email: string, phone: string, seat: number) {
    this.from = from;
    this.to = to;
    this.reserveBy = reserveBy;
    this.email = email;
    this.phone = phone;
    this.seat = seat;
  }
}
