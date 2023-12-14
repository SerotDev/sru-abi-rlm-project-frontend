import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavouritesComponent } from './add-favourites.component';

describe('AddFavouritesComponent', () => {
  let component: AddFavouritesComponent;
  let fixture: ComponentFixture<AddFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFavouritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
