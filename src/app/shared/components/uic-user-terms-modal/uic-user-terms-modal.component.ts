import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-text-modal',
  templateUrl: './uic-user-terms-modal.component.html'
})
export class UicUserTermsModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  async ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
