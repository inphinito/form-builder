import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnrichedTextComponent } from './enriched-text.component';

describe('EnrichedTextComponent', () => {
  let component: EnrichedTextComponent;
  let fixture: ComponentFixture<EnrichedTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrichedTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrichedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
