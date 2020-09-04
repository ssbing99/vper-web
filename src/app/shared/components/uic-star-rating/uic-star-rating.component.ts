import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-star-ratings',
  templateUrl: './uic-star-rating.component.html'
})
export class UicStarRatingComponent {
  Arr = Array;
  starNum = 5;
  @Input() rating: number;
  @Input() noRight = false;

  constructor() {
  }
}
