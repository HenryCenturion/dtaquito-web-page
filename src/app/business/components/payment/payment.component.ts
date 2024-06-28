import {Component, OnInit} from '@angular/core';
import {Payment} from "../../models/payment.model";
import {PaymentsService} from "../../services/payments.service";
import {AsyncPipe, DatePipe, NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    DatePipe,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  payment: any;
  loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
  errorMessage: string | null = null;
  cardNumberError: string | null = null;
  cvvError: string | null = null;
  expirationDateError: string | null = null;
  showPopup = false;
  showDeletePopup = false;
  paymentToDelete: any = null;

  constructor(private paymentsService: PaymentsService) {
  }

  ngOnInit(): void {
    this.getPayment();
  }

  getPayment(): void {
    this.paymentsService.getPaymentByUserId(this.loggedUser.id).subscribe((payment: any) => {
      this.payment = payment;
    });
  }
  createPayment(payment: Payment)
  {
  if (this.payment) {
    return;
  }

  if (!payment.cardNumber || payment.cardNumber.length !== 16) {
    this.cardNumberError = 'El número de tarjeta debe tener exactamente 16 dígitos.';
  } else {
    this.cardNumberError = null;
  }

    if (!this.isValidCardIssuer(payment.cardNumber)) {
      this.cardNumberError = 'Tarjeta de crédito no válida';
    }

  if (!payment.cvv || payment.cvv.length !== 3) {
    this.cvvError = 'El CVV debe tener exactamente 3 dígitos.';
  } else {
    this.cvvError = null;
  }

  if (this.cardNumberError || this.cvvError) {
    return;
  }

    const [year, month] = payment.expirationDate.split('-');
    const expirationDate = new Date(Number(year), Number(month) - 1);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (payment.expirationDate) {
      const [year, month] = payment.expirationDate.split('-');
      const expirationDate = new Date(Number(year), Number(month) - 1);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (expirationDate <= currentDate) {
        this.expirationDateError = 'La fecha de expiración debe ser mayor a la fecha actual.';
      } else {
        this.expirationDateError = null;
      }
    } else {
      this.expirationDateError = 'La fecha de expiración es requerida.';
    }

    if (this.cardNumberError || this.cvvError || this.expirationDateError) {
      return;
    }

    payment.expirationDate = expirationDate;
    payment.balance = 1000;
    payment.userId = this.loggedUser.id;
    payment.cardIssuer = this.detectCardIssuer(payment.cardNumber);

  this.paymentsService.createPayment(payment).subscribe(payment => {
    this.payment = payment;
    this.showSuccessPopup();
  });
}

  deletePayment(): void {
    if (!this.payment) {
      console.log('No hay método de pago para eliminar.');
      return;
    }

    // Show confirmation popup
    this.paymentToDelete = this.payment;
    this.showDeletePopup = true;
  }

  confirmDelete(confirm: boolean): void {
    if (confirm && this.paymentToDelete) {
      this.paymentsService.deletePayment(this.paymentToDelete.id).subscribe(
        () => {
          console.log('Método de pago eliminado.');
          this.payment = null;
          this.errorMessage = 'Método de pago eliminado';
          this.paymentToDelete = null;
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = 'Ocurrió un error al eliminar el método de pago';
        }
      );
    }
    this.showDeletePopup = false;
  }

  numericOnly(event: any): boolean {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  private detectCardIssuer(cardNumber: string): string {
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === '4') {
      return 'Visa';
    } else if (firstDigit === '5') {
      return 'Mastercard';
    } else {
      return 'Unknown';
    }
  }

  private isValidCardIssuer(cardNumber: string): boolean {
    const firstDigit = cardNumber.charAt(0);
    return firstDigit === '4' || firstDigit === '5';
  }

  private showSuccessPopup(): void {
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 4000); // Hide after 3 seconds
  }
}
