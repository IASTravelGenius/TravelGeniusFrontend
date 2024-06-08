import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristicAttractionsResultsComponent } from './touristic-attractions-results.component';

describe('TouristicAttractionsResultsComponent', () => {
  let component: TouristicAttractionsResultsComponent;
  let fixture: ComponentFixture<TouristicAttractionsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouristicAttractionsResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristicAttractionsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
