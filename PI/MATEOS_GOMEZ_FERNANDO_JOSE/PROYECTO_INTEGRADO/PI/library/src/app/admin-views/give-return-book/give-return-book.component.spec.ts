import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveReturnBookComponent } from './give-return-book.component';

describe('GiveReturnBookComponent', () => {
  let component: GiveReturnBookComponent;
  let fixture: ComponentFixture<GiveReturnBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveReturnBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveReturnBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
