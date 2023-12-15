import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHotelsComponent } from './edit-hotels.component';

describe('EditHotelsComponent', () => {
  let component: EditHotelsComponent;
  let fixture: ComponentFixture<EditHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHotelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
