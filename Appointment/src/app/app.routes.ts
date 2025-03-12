import { provideRouter, Routes } from '@angular/router';
import { DepartmentService } from './services/department.service';
import { DepartmentsComponent } from './components/user/departments/departments.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoginComponent } from './components/user/login/login.component';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { from } from 'rxjs';
import { DepartmentDetailComponent } from './components/user/department-detail/department-detail.component';

export const routes: Routes = [
  {path: '', redirectTo:'departments', pathMatch: 'full'}, 
  { path: 'departments', component: DepartmentsComponent }, 
  { path: 'about', component: DepartmentsComponent }, // Temporary - Replace with About Component
  { path: 'profile', component: ProfileComponent },
  {path:'login',component:LoginComponent},
  {path:'',component:AppComponent},
  {path:'registration',component:RegistrationComponent},
  {path: 'departments/:id', component: DepartmentDetailComponent}

];
export const appRouting = provideRouter(routes);

