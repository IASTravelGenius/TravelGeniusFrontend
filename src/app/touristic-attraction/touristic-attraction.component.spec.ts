import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristicAttractionComponent } from './touristic-attraction.component';

describe('TouristicAttractionComponent', () => {
  let component: TouristicAttractionComponent;
  let fixture: ComponentFixture<TouristicAttractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouristicAttractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristicAttractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
