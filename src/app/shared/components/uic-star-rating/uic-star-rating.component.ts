import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-star-ratings',
  templateUrl: './uic-star-rating.component.html'
})
export class UicStarRatingComponent implements OnInit {
  Arr = Array;
  starNum = 5;
  @Input() rating: number;
  @Input() noRight = false;

  constructor() {
  }

  ngOnInit(): void {
    this.rating = Number(this.rating);
  }
}
