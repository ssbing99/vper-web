import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChefChatListPage } from './chef-chat-list.page';

describe('ChefChatListPage', () => {
  let component: ChefChatListPage;
  let fixture: ComponentFixture<ChefChatListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefChatListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChefChatListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
