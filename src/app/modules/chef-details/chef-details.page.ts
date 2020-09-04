import {Component, OnInit, Injector} from '@angular/core';
import {BasePageComponent} from 'src/app/core/components/base-page/base-page.component';
import {ActivatedRoute} from '@angular/router';
import {DishRestService} from '../../shared/services/api/dish.rest.service';
import {tap} from 'rxjs/operators';
import {ChefDetailsModel, ChefModel, DishModel} from '../../shared/models/chef.model';
import {ResponseModel} from '../../shared/models/request.model';
import {ModalController} from '@ionic/angular';
import {UicRecipeModalComponent} from '../../shared/components/uic-recipe-modal/uic-recipe-modal.component';
import {UicChatModalComponent} from '../../shared/components/uic-chat-modal/uic-chat-modal.component';

@Component({
  selector: 'app-chef-details',
  templateUrl: './chef-details.page.html',
  styleUrls: ['./chef-details.page.scss'],
})
export class ChefDetailsPage extends BasePageComponent implements OnInit {
  chefDetails: ChefDetailsModel = null;
  rating = 0;
  Num = Number;

  constructor(protected injector: Injector,
              private route: ActivatedRoute,
              private dishRestService: DishRestService,
              private modalCtrl: ModalController) {
    super(injector);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.dishRestService.getChefDetailsById({
      userId: id
    }).pipe(
      tap((res: ResponseModel<ChefDetailsModel>) => {
        this.chefDetails = res.data;
        let total = 0;
        this.chefDetails.review.forEach(review => {
          total += Number(review.ratings);
        });

        if (total > 0) {
          this.rating = Math.round(total / this.chefDetails.review.length);
        }
      })
    ).subscribe();
  }

  async showDishDetails(dish: DishModel) {
    const modal = await this.modalCtrl.create({
      component: UicRecipeModalComponent,
      cssClass: 'login-modal',
      componentProps: {
        dish
      }
    });
    return await modal.present();
  }

  async showChat() {
    const modal = await this.modalCtrl.create({
      component: UicChatModalComponent,
      cssClass: 'login-modal',
      componentProps: {
        toUserId: this.chefDetails.profile.id,
        toUserImage: this.chefDetails.profile.user_image,
      }
    });

    return await modal.present();
  }
}
