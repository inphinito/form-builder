import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPerRoleComponent } from './config-per-role.component';

describe('ConfigPerRoleComponent', () => {
  let component: ConfigPerRoleComponent;
  let fixture: ComponentFixture<ConfigPerRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigPerRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPerRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
