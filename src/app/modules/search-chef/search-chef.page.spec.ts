import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchChefPage } from './search-chef.page';

describe('SearchChefPage', () => {
  let component: SearchChefPage;
  let fixture: ComponentFixture<SearchChefPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchChefPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchChefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
