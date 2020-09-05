import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuickPayPage } from './quick-pay.page';

describe('QuickPayPage', () => {
  let component: QuickPayPage;
  let fixture: ComponentFixture<QuickPayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuickPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
