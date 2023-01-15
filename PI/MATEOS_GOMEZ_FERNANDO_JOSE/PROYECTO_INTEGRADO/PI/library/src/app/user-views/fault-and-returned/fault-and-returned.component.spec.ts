import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultAndReturnedComponent } from './fault-and-returned.component';

describe('FaultAndReturnedComponent', () => {
  let component: FaultAndReturnedComponent;
  let fixture: ComponentFixture<FaultAndReturnedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaultAndReturnedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultAndReturnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
