import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WeekPayPage } from './week-pay.page';

describe('WeekPayPage', () => {
  let component: WeekPayPage;
  let fixture: ComponentFixture<WeekPayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekPayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeekPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
