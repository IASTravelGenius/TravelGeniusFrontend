import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailOptInComponent } from './email-opt-in.component';

describe('EmailOptInComponent', () => {
  let component: EmailOptInComponent;
  let fixture: ComponentFixture<EmailOptInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailOptInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailOptInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
