import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading;
  constructor(private loadingCtrl: LoadingController) {}

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'loading-modal',
      message: 'Loading...',
    });
    await this.loading.present();
  }

  async dismiss() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}
