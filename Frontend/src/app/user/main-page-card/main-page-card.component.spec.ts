import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageCardComponent } from './main-page-card.component';

describe('MainPageCardComponent', () => {
  let component: MainPageCardComponent;
  let fixture: ComponentFixture<MainPageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
