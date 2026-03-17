import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpListComponent } from './exp-list-component';

describe('ExpListComponent', () => {
  let component: ExpListComponent;
  let fixture: ComponentFixture<ExpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
