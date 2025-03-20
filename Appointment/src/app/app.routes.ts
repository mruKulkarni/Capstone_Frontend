import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { DepartmentService } from './services/department.service';
import { DepartmentsComponent } from './components/user/departments/departments.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoginComponent } from './components/user/login/login.component';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { from } from 'rxjs';
import { AddDoctorComponent } from './components/admin/add-doctor/add-doctor.component';
import { ConfirmationComponent } from './components/user/confirmation/confirmation.component';
import { DepartmentDetailComponent } from './components/user/department-detail/department-detail.component';
import { ReviewsComponent } from './components/user/reviews/reviews.component';
import { AddDepartmentComponent } from './components/admin/add-department/add-department.component';
import { AboutUsComponent } from './components/user/about-us/about-us.component';
import { DoctorListComponent } from './components/admin/doctor-list/doctor-list.component';
import { UserAppointmentsComponent } from './components/user/user-appointments/user-appointments.component';
import { ManageAppointmentComponent } from './components/admin/manage-appointment/manage-appointment.component';
import { LandingPageComponent } from './components/user/landing-page/landing-page.component';

export const routes: Routes = [
  //{path: '', redirectTo:'login', pathMatch: 'full'}, 
  { path: 'departments', component: DepartmentsComponent }, 
  { path: 'about', component: AboutUsComponent }, // Temporary - Replace with About Component
  { path: 'profile', component: ProfileComponent },
  {path:'login',component:LoginComponent},
  //{path:'',component:AppComponent},
  {path:'registration',component:RegistrationComponent},
  {path: 'add-doctor', component: AddDoctorComponent},
  { path: 'appointment-confirmation', component: ConfirmationComponent },
  {path: 'departments/:id', component: DepartmentDetailComponent},
  { path: 'appointment-confirmation', component: ConfirmationComponent },
  {path: 'departments/:id', component: DepartmentDetailComponent},
  {path:'addDepartment',component:AddDepartmentComponent},
  { path: 'appointment-confirmation', component: ConfirmationComponent },
  {path: 'review', component: ReviewsComponent},
  {path: 'doctor-list', component: DoctorListComponent},
  {path: 'user-appointments', component: UserAppointmentsComponent},
  {path: 'doctor-list', component: DoctorListComponent},
  {path: 'review', component: ReviewsComponent},
  {path:'all-appointments',component:ManageAppointmentComponent},
  {path: '', component: LandingPageComponent}
];
export const appRouting = provideRouter(routes, withComponentInputBinding());

