import {Component, OnInit} from '@angular/core';
import {SubscriptionsService} from "../../services/subscriptions.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PaymentsService} from "../../services/payments.service";
import {Payment} from "../../models/payment.model";

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit {
  subscriptionId: any;
  subscription: any;
  payments: Payment[] = [];
  selectedPayment: string | null = null;
  loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
  showModal = false;

  constructor(private subscriptionsService: SubscriptionsService, private paymentsService: PaymentsService) {
  }

  ngOnInit() {
    this.getSubscription();
    this.getPayments();
  }

  getSubscription() {
    this.subscriptionsService.getSubscriptionByUserId(this.loggedUser.id).subscribe(subscription => {
      this.subscription = subscription;
    });
  }

getPayments() {
  this.paymentsService.getPaymentByUserId(this.loggedUser.id).subscribe(payments => {
    this.payments = payments ? (Array.isArray(payments) ? payments : [payments]) : [];
  });
}

  onPaymentMethodChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedPayment = selectElement.value;
  }

  upgradeToPremium() {

      this.subscriptionsService.getSubscriptionByUserId(this.loggedUser.id).subscribe(subscription => {
        this.subscriptionId = subscription.id;

        const updatedSubscription = {planId: 1, userId: this.loggedUser.id};
        this.subscriptionsService.updateSubscription(this.subscriptionId, updatedSubscription).subscribe(updatedSubscription => {
          if (updatedSubscription.planId === 1) {
            this.subscription = updatedSubscription;
            location.reload();
          } else {
            alert(updatedSubscription.message);
          }
        });
      });
  }

  confirmUpgrade() {
    this.showModal = true;
  }

  openPaymentModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }


}
