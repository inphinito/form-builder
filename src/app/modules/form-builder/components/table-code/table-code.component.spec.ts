import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCodeComponent } from './table-code.component';

describe('TableCodeComponent', () => {
  let component: TableCodeComponent;
  let fixture: ComponentFixture<TableCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
