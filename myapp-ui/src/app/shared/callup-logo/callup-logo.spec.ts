import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallupLogo } from './callup-logo';

describe('CallupLogo', () => {
  let component: CallupLogo;
  let fixture: ComponentFixture<CallupLogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallupLogo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallupLogo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
