import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportSpaceCardsComponent } from './sport-space-cards.component';

describe('SpaceCardsComponent', () => {
  let component: SportSpaceCardsComponent;
  let fixture: ComponentFixture<SportSpaceCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportSpaceCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportSpaceCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
