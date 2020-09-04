import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DishRestService} from '../../services/api/dish.rest.service';
import {catchError, tap} from 'rxjs/operators';
import {ChefAmountModel} from '../../models/chef.model';

@Component({
  selector: 'app-count-cost-modal',
  templateUrl: './uic-count-cost-modal.component.html'
})
export class UicCountCostModalComponent {
  @Input() noOfDay: number;
  selectedPerson = [0, 0, 0, 0, 0, 0];
  totalPersons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  amount;

  constructor(private modalCtrl: ModalController,
              private dishRestService: DishRestService) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  calculate() {
    this.amount = '';
    this.dishRestService.getTotalChefAmount({
      totaldays: this.noOfDay,
      person: this.selectedPerson
    }).pipe(
      tap((res: ChefAmountModel) => this.amount = res.price),
      catchError(err => this.amount = null)
    ).subscribe();
  }
}
