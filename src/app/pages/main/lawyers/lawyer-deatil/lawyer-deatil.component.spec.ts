import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerDeatilComponent } from './lawyer-deatil.component';

describe('LawyerDeatilComponent', () => {
  let component: LawyerDeatilComponent;
  let fixture: ComponentFixture<LawyerDeatilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawyerDeatilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyerDeatilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
