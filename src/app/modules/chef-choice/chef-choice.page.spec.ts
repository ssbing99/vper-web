import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChefChoicePage } from './chef-choice.page';

describe('ChefChoicePage', () => {
  let component: ChefChoicePage;
  let fixture: ComponentFixture<ChefChoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefChoicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChefChoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
