import {Component, OnInit, Injector, NgZone} from '@angular/core';
import {BasePageComponent} from 'src/app/core/components/base-page/base-page.component';
import {Geolocation} from '@capacitor/core';
import {ChefModel, DishModel, GetChefSearchResult} from '../../shared/models/chef.model';
import {DishRestService} from '../../shared/services/api/dish.rest.service';
import {tap} from 'rxjs/operators';
import {ResponseModel} from '../../shared/models/request.model';
import {ModalController} from '@ionic/angular';
import {UicRecipeModalComponent} from '../../shared/components/uic-recipe-modal/uic-recipe-modal.component';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/services/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {UicChatModalComponent} from '../../shared/components/uic-chat-modal/uic-chat-modal.component';

@Component({
  selector: 'app-search-chef',
  templateUrl: './search-chef.page.html',
  styleUrls: ['./search-chef.page.scss'],
})
export class SearchChefPage extends BasePageComponent implements OnInit {
  chefList: ChefModel[];
  Arr = Array;
  totalCountPage = 0;
  params = {
    page: 0,
    pageCount: 5,
    latitude: '',
    longitude: '',
    callType: 'chef',
    name: ''
  };

  Geocoder: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems = [];
  location = '';
  originalLocation = {
    latitude: '',
    longitude: ''
  };

  constructor(protected injector: Injector,
              private dishRestService: DishRestService,
              private modalCtrl: ModalController,
              private router: Router,
              private alertService: AlertService,
              private zone: NgZone,
              private translateService: TranslateService) {
    super(injector);
    this.Geocoder = new google.maps.Geocoder();
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  async ngOnInit() {
    Geolocation.getCurrentPosition().then((coordinates) => {
      this.params.latitude = coordinates.coords.latitude.toString();
      this.params.longitude = coordinates.coords.longitude.toString();
      this.originalLocation.latitude = coordinates.coords.latitude.toString();
      this.originalLocation.longitude = coordinates.coords.longitude.toString();
      this.getChefList();
    }).catch((err) => this.alertService.presentErrorAlert('Please enable the location plugins on your browser.'));
  }

  getChefList() {
    this.chefList = null;
    this.dishRestService.getChefs(this.params).pipe(
      tap((res: ResponseModel<ChefModel[]>) => {
        this.chefList = res.data;
        if (this.chefList.length < this.params.pageCount && this.params.page === 0) {
          this.totalCountPage = 1;
        } else {
          this.totalCountPage = Math.ceil(res.totalcountpage / this.params.pageCount);
        }
      })
    ).subscribe();
  }

  async onShowDetails(dish: DishModel) {
    const modal = await this.modalCtrl.create({
      component: UicRecipeModalComponent,
      cssClass: 'login-modal',
      componentProps: {
        dish
      }
    });

    return await modal.present();
  }

  onShowChef(chef: ChefModel) {
    this.router.navigate(['/chef-details', chef.id]);
  }

  goPreviousList() {
    if (this.params.page === 0) {
      return;
    }
    this.params.page--;
    this.getChefList();
  }

  getNewList(index: number) {
    this.params.page = index;
    this.getChefList();
  }

  goNextList() {
    if (this.params.page + 1 === this.totalCountPage) {
      return;
    }
    this.params.page++;
    this.getChefList();
  }

  imageLoad(chef: ChefModel) {
    chef.isLoaded = true;
  }

  dishImageLoad(dish: DishModel) {
    dish.isLoaded = true;
  }

  updateSearchResults(event) {
    if (event.target.value === '') {
      this.autocompleteItems = [];
      return;
    }

    this.dishRestService.getChefsByKeywords({
      keywords: event.target.value
    }).pipe(
      tap((res: ResponseModel<GetChefSearchResult[]>) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          if (res.data && res.data.length > 0) {
            res.data.forEach((chef, index) => {
              if (index < 5) {
                this.autocompleteItems.push({
                  name: chef.fname + ' ' + chef.lname,
                  fname: chef.fname,
                  lname: chef.lname,
                  data: null,
                  type: 'chef'
                });
              }
            });
          }
        });

        this.GoogleAutocomplete.getPlacePredictions({input: event.target.value, componentRestrictions: {
          country: ['no']
        }}, (predictions, status) => {
            this.zone.run(() => {
              if (this.autocompleteItems.length < 5 && predictions != null) {
                predictions.forEach((prediction, index) => {
                  if (this.autocompleteItems.length < 5) {
                    this.autocompleteItems.push({
                      name: prediction.description,
                      data: prediction,
                      type: 'location'
                    });
                  }
                });
              }
            });
          },
          (error) => {
            if (this.autocompleteItems.length === 0) {
              this.alertService.presentErrorAlert(this.translateService.instant('error'));
            }
          }
        );
      })
    ).subscribe();
  }

  selectItem(item) {
    if (item.type === 'chef') {
      this.params.name = item.fname;
      this.params.latitude = this.originalLocation.latitude;
      this.params.longitude = this.originalLocation.longitude;
      this.location = item.name;
      this.getChefList();

      this.zone.run(() => {
        this.autocompleteItems = [];
      });
    } else {
      this.Geocoder.geocode({
        address: item.data.description
      }, (result, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          this.params.name = '';
          this.params.latitude = result[0].geometry.location.lat().toString();
          this.params.longitude = result[0].geometry.location.lng().toString();
          this.location = item.description;
          this.getChefList();

          this.zone.run(() => {
            this.autocompleteItems = [];
          });
        }
      });
    }
  }

  async showChat(chef: ChefModel) {
    const modal = await this.modalCtrl.create({
      component: UicChatModalComponent,
      cssClass: 'login-modal',
      componentProps: {
        toUserId: chef.id,
        toUserImage: chef.user_image,
      }
    });

    return await modal.present();
  }
}
