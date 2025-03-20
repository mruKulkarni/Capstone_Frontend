import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsComponent } from './reviews.component';
import { provideHttpClient } from '@angular/common/http';

describe('ReviewsComponent', () => {
  let component: ReviewsComponent;
  let fixture: ComponentFixture<ReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsComponent],
      providers: [
                    provideHttpClient()
                  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
