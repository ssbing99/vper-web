import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertCtrl: AlertController) {
  }

  async presentErrorAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentSuccessAlert(message: string, callback?: () => void) {
    if (callback) {
      const alert = await this.alertCtrl.create({
        header: 'Success',
        message,
        buttons: [{
          text: 'OK',
          handler: () => callback()
        }]
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Success',
        message,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async presentConfirmationAlert(title: string, message: string, callback: () => void) {
    const alert = await this.alertCtrl.create({
      header: title,
      message,
      buttons: ['No', {
        text: 'Yes',
        handler: () => callback()
      }]
    });

    await alert.present();
  }
}
