import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportSpaceCreationComponent } from './sport-space-creation.component';

describe('SportSpaceCreationComponent', () => {
  let component: SportSpaceCreationComponent;
  let fixture: ComponentFixture<SportSpaceCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportSpaceCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SportSpaceCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
