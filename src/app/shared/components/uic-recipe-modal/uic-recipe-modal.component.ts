import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DishModel} from '../../models/chef.model';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './uic-recipe-modal.component.html'
})
export class UicRecipeModalComponent {
  @Input() dish: DishModel;

  constructor(private modalCtrl: ModalController) {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
