import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventsComponent } from './edit-events.component';

describe('EditEventsComponent', () => {
  let component: EditEventsComponent;
  let fixture: ComponentFixture<EditEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
