import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportSpaceDetailComponent } from './sport-space-detail.component';

describe('SportSpaceDetailComponent', () => {
  let component: SportSpaceDetailComponent;
  let fixture: ComponentFixture<SportSpaceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportSpaceDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SportSpaceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
