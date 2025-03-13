import { provideRouter, Routes } from '@angular/router';
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
import { AddDepartmentComponent } from './components/admin/add-department/add-department.component';

export const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'}, 
  { path: 'departments', component: DepartmentsComponent }, 
  { path: 'about', component: DepartmentsComponent }, // Temporary - Replace with About Component
  { path: 'profile', component: ProfileComponent },
  {path:'login',component:LoginComponent},
  {path:'',component:AppComponent},
  {path:'registration',component:RegistrationComponent},
  {path: 'add-doctor', component: AddDoctorComponent},
  { path: 'appointment-confirmation', component: ConfirmationComponent }
  {path: 'departments/:id', component: DepartmentDetailComponent}
  {path:'addDepartment',component:AddDepartmentComponent}

];
export const appRouting = provideRouter(routes);

