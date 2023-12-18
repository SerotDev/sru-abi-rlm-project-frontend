import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHotelComponent } from './update-hotel.component';

describe('UpdateHotelComponent', () => {
  let component: UpdateHotelComponent;
  let fixture: ComponentFixture<UpdateHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateHotelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
