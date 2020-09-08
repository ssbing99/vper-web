import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './uic-share-link-modal.component.html'
})
export class UicShareLinkModalComponent {
  @Input() link: {title?:string, link?:string};

  constructor(private modalCtrl: ModalController) {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  copyToClipboard(link){
    let aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById('link').innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    console.log("Text copied", document.getElementById('link').innerHTML)
    document.body.removeChild(aux);
  }
}
