import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessConceptPage } from './business-concept.page';

describe('BusinessConceptPage', () => {
  let component: BusinessConceptPage;
  let fixture: ComponentFixture<BusinessConceptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessConceptPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessConceptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
