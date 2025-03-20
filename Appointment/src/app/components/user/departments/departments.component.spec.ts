import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsComponent } from './departments.component';
import { provideHttpClient } from '@angular/common/http';

describe('DepartmentsComponent', () => {
  let component: DepartmentsComponent;
  let fixture: ComponentFixture<DepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentsComponent],
      providers: [
        provideHttpClient()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
