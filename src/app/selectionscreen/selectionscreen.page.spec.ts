import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectionscreenPage } from './selectionscreen.page';

describe('SelectionscreenPage', () => {
  let component: SelectionscreenPage;
  let fixture: ComponentFixture<SelectionscreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionscreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectionscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
