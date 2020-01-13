export class Reservation {
  id: number;
  reservationId: string;
  from: string;
  to: string;
  reserveBy: string;
  email: string;
  phone: string;
  seat: number;
  totalPrice: number;
  status: string;


  constructor(id: number, reservationId: string, from: string, to: string, reserveBy: string, email: string, phone: string, seat: number, totalPrice: number, status: string) {
    this.id = id;
    this.reservationId = reservationId;
    this.from = from;
    this.to = to;
    this.reserveBy = reserveBy;
    this.email = email;
    this.phone = phone;
    this.seat = seat;
    this.totalPrice = totalPrice;
    this.status = status;
  }
}
