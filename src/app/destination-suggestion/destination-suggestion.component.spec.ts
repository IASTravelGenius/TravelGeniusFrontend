import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationSuggestionComponent } from './destination-suggestion.component';

describe('DestinationSuggestionComponent', () => {
  let component: DestinationSuggestionComponent;
  let fixture: ComponentFixture<DestinationSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
