import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MustSeeComponent } from './must-see.component';

describe('MustSeeComponent', () => {
  let component: MustSeeComponent;
  let fixture: ComponentFixture<MustSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MustSeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MustSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
