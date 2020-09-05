import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChefMyEarningPage } from './chef-my-earning.page';

describe('ChefMyEarningPage', () => {
  let component: ChefMyEarningPage;
  let fixture: ComponentFixture<ChefMyEarningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefMyEarningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChefMyEarningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
