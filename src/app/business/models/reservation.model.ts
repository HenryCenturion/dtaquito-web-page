export class Reservation {
  id: any;
  time: any;
  hours: any;
  userId: any;
  sportSpaceId: any;

  constructor(id: any, time: any, hours: any, userId: any, sportSpaceId: any) {
    this.id = id;
    this.time = time;
    this.hours = hours;
    this.userId = userId;
    this.sportSpaceId = sportSpaceId;
  }
}
