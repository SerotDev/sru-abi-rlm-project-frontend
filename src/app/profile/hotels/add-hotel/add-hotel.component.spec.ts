import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHotelComponent } from './add-hotel.component';

describe('AddHotelComponent', () => {
  let component: AddHotelComponent;
  let fixture: ComponentFixture<AddHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHotelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
