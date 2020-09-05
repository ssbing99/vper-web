import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyReferralPage } from './my-referral.page';

describe('MyReferralPage', () => {
  let component: MyReferralPage;
  let fixture: ComponentFixture<MyReferralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReferralPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyReferralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
