import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookChefPage } from './book-chef.page';

describe('BookChefPage', () => {
  let component: BookChefPage;
  let fixture: ComponentFixture<BookChefPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookChefPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookChefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
