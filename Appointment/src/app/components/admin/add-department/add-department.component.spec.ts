import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentComponent } from './add-department.component';
import { provideHttpClient } from '@angular/common/http';

describe('AddDepartmentComponent', () => {
  let component: AddDepartmentComponent;
  let fixture: ComponentFixture<AddDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDepartmentComponent],
      providers: [
                    provideHttpClient()
                  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
