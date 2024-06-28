export class Payment {
  id: any;
  cardNumber: any;
  expirationDate: any;
  cardHolder: any;
  cardIssuer: any;
  cvv: any;
  balance: any;
  userId: any;

  constructor(id: any, cardNumber: any, expirationDate: any, cardHolder: any, cardIssuer: any, cvv: any, balance:any, userId: any) {
    this.id = id;
    this.cardNumber = cardNumber;
    this.expirationDate = expirationDate;
    this.cardHolder = cardHolder;
    this.cardIssuer = cardIssuer;
    this.cvv = cvv;
    this.balance = balance;
    this.userId = userId;
  }
}
