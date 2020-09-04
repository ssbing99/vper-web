import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {LoadingService} from '../../services/loading.service';
import {AlertService} from '../../services/alert.service';
import {environment} from '../../../../environments/environment';

declare var Stripe;

@Component({
  selector: 'app-stripe-element',
  templateUrl: 'uic-stripe-element.component.html',
  styleUrls: ['./uic-stripe-element.component.scss'],
})
export class UicStripeElementComponent implements OnInit, OnChanges {
  @Input() secretClient: string;
  @Input() totalAmount = 0;
  @Input() callback: any;
  @Input() requireActionCallback: any;
  @Input() showSaveCard = false;
  @Input() submitBtnText: string;
  @Input() hidePostalCode = false;

  public saveCard = false;
  public card;

  // Create a Stripe client.
  public stripe = Stripe(environment.stripeClientId);

  constructor(public loadingService: LoadingService,
              public alertService: AlertService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.secretClient != null) {
      this.stripe.handleCardAction(this.secretClient)
        .then(result => {
          if (result.error) {
            // Inform the user if there was an error.
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            if (this.requireActionCallback != null) {
              this.card.clear();
              this.requireActionCallback(this.saveCard, result.paymentIntent.id);
            }
          }
        }).catch(err => {
        this.alertService.presentErrorAlert('There is an error with your card maybe invalid card detail or something else.');
      });
    }
  }

  ngOnInit(): void {
    // Create an instance of Elements.
    const elements = this.stripe.elements();
    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element.
    this.card = elements.create('card', {style, hidePostalCode: this.hidePostalCode});

    // Add an instance of the card Element into the `card-element` <div>.
    this.card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    // tslint:disable-next-line:only-arrow-functions
    this.card.addEventListener('change', function(event) {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    // Handle form submission.
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();

      this.loadingService.presentLoading().then(() => {
        this.stripe.createPaymentMethod({
          type: 'card',
          card: this.card
        }).then(result => {
          this.loadingService.dismiss();
          if (result.error) {
            // Inform the user if there was an error.
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            if (result.paymentMethod) {
              this.card.clear();
              if (this.callback != null) {
                this.callback(this.saveCard, result.paymentMethod.id);
              }
            }
          }
        }).catch(err => {
          this.loadingService.dismiss();
          this.alertService.presentErrorAlert('There is an error with your card maybe invalid card detail or something else.');
        });
      });
    });
  }
}
