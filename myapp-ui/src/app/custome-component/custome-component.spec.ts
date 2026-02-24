import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeComponent } from './custome-component';

describe('CustomeComponent', () => {
  let component: CustomeComponent;
  let fixture: ComponentFixture<CustomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
