import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasePredictionComponent } from './disease-prediction.component';

describe('DiseasePredictionComponent', () => {
  let component: DiseasePredictionComponent;
  let fixture: ComponentFixture<DiseasePredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseasePredictionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseasePredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
