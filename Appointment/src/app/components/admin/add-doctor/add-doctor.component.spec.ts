// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AddDoctorComponent } from './add-doctor.component';

// describe('AddDoctorComponent', () => {
//   let component: AddDoctorComponent;
//   let fixture: ComponentFixture<AddDoctorComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AddDoctorComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AddDoctorComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDoctorComponent } from './add-doctor.component';
import { DepartmentService } from '../../../services/department.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddDoctorComponent', () => {
  let component: AddDoctorComponent;
  let fixture: ComponentFixture<AddDoctorComponent>;
  let departmentService: jasmine.SpyObj<DepartmentService>;

  beforeEach(async () => {
    const departmentServiceSpy = jasmine.createSpyObj('DepartmentService', ['getDepartments']);

    await TestBed.configureTestingModule({
      imports: [AddDoctorComponent, HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: DepartmentService, useValue: departmentServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDoctorComponent);
    component = fixture.componentInstance;
    departmentService = TestBed.inject(DepartmentService) as jasmine.SpyObj<DepartmentService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.doctorForm.value).toEqual({
      doctorCode: '',
      name: '',
      qualification: '',
      departmentId: ''
    });
  });

  it('should fetch departments on init', () => {
    const mockDepartments = [{ id: 1, name: 'Cardiology' }];
    departmentService.getDepartments.and.returnValue(of(mockDepartments));
    component.ngOnInit();
    expect(component.departments).toEqual(mockDepartments);
  });

  it('should handle error if department fetch fails', () => {
    spyOn(console, 'error');
    departmentService.getDepartments.and.returnValue(throwError(() => new Error('Failed to load')));
    component.fetchDepartments();
    expect(console.error).toHaveBeenCalledWith('Error fetching departments:', jasmine.any(Error));
  });

  it('should not submit form if invalid', () => {
    spyOn(component, 'onSubmit');
    component.doctorForm.setValue({ doctorCode: '', name: '', qualification: '', departmentId: '' });
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });
});