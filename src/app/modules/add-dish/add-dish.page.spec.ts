import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDishPage } from './add-dish.page';

describe('AddDishPage', () => {
  let component: AddDishPage;
  let fixture: ComponentFixture<AddDishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDishPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
