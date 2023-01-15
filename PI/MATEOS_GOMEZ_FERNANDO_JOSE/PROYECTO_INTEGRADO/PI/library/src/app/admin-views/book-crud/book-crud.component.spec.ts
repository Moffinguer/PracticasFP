import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCrudComponent } from './book-crud.component';

describe('BookCrudComponent', () => {
  let component: BookCrudComponent;
  let fixture: ComponentFixture<BookCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
