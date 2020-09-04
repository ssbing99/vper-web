import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {UicRecipeModalComponent} from '../uic-recipe-modal/uic-recipe-modal.component';
import {UicCountCostModalComponent} from './uic-count-cost-modal.component';
import {catchError, tap} from 'rxjs/operators';
import {ChefAmountModel} from '../../models/chef.model';
import {DishRestService} from '../../services/api/dish.rest.service';

@Component({
  selector: 'app-count-cost',
  templateUrl: './uic-count-cost.component.html'
})
export class UicCountCostComponent {
  totalDays = [1, 2, 3, 4, 5, 6];
  totalPersons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  daySelected = '1';
  personSelected = '';
  amount = '0';

  constructor(private modalCtrl: ModalController,
              private dishRestService: DishRestService) {}

  async changeDay() {
    if (Number(this.daySelected) > 1) {
      const modal = await this.modalCtrl.create({
        component: UicCountCostModalComponent,
        cssClass: 'login-modal',
        componentProps: {
          noOfDay: Number(this.daySelected)
        }
      });

      modal.onDidDismiss().then(() => {
        this.daySelected = '';
        this.personSelected = '';
      });
      return await modal.present();
    }
  }

  changePerson() {
    if (this.daySelected !== '' && this.personSelected !== '') {
      this.amount = null;
      this.dishRestService.getTotalChefAmount({
        totaldays: Number(this.daySelected),
        person: [Number(this.personSelected), 0, 0, 0, 0, 0]
      }).pipe(
        tap((res: ChefAmountModel) => this.amount = res.price),
        catchError(err => this.amount = null)
      ).subscribe();
    }
  }
}
