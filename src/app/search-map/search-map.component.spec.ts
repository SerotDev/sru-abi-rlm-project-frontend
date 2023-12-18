import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMapComponent } from './search-map.component';

describe('SearchMapComponent', () => {
  let component: SearchMapComponent;
  let fixture: ComponentFixture<SearchMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
