import { Component, Injector } from '@angular/core';
import { BasePageComponent } from 'src/app/core/components/base-page/base-page.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePageComponent {

  constructor(protected injector: Injector) {
    super(injector);
  }

}
