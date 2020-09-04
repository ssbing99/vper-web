import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommonTipsPage } from './common-tips.page';

describe('CommonTipsPage', () => {
  let component: CommonTipsPage;
  let fixture: ComponentFixture<CommonTipsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonTipsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommonTipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
