import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristicAttractionsAllComponent } from './touristic-attractions-all.component';

describe('TouristicAttractionsAllComponent', () => {
  let component: TouristicAttractionsAllComponent;
  let fixture: ComponentFixture<TouristicAttractionsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouristicAttractionsAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristicAttractionsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
