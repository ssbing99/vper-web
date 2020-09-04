import { Component, Injector } from '@angular/core';
import { EventService } from '../../services/event.service';
import { EventConstant } from 'src/app/shared/constant/event.constant';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html'
})

export class BasePageComponent {
  protected eventService: EventService;

  constructor(protected injector: Injector) {
    this.eventService = this.injector.get(EventService);
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.eventService.publish(EventConstant.HEADER_LOAD, null);
  }
}
