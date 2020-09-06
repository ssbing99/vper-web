import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-uic-skeleton',
  templateUrl: './uic-skeleton.component.html',
  styleUrls: ['./uic-skeleton.component.scss'],
})
export class UicSkeletonComponent implements OnInit {

  loadingBarSequence = [60, undefined, 88, 70, 60];
  @Input()
  loadingBar = 5;

  skeletonArr = [];

  constructor() { }

  ngOnInit() {
    const requireIncrease = this.loadingBar > this.loadingBarSequence.length;
    if (requireIncrease) {
      let increaseSize = Math.ceil((this.loadingBar - this.loadingBarSequence.length) / 5);
      const tempLoadingSequence = JSON.parse(JSON.stringify(this.loadingBarSequence));
      while (increaseSize > 0) {
        tempLoadingSequence.forEach(ele => this.loadingBarSequence.push(ele));
        increaseSize--;
      }
    }

    for(let i = 0; i < this.loadingBar; i++) {
      this.skeletonArr.push(this.loadingBarSequence[i]);
    }
  }

}
