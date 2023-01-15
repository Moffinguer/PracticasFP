import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarAdminComponent } from './top-bar-admin.component';

describe('TopBarAdminComponent', () => {
  let component: TopBarAdminComponent;
  let fixture: ComponentFixture<TopBarAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
