import { Routes } from '@angular/router';
import { DepartmentService } from './services/department.service';
import { DepartmentsComponent } from './components/user/departments/departments.component';
import { ProfileComponent } from './components/user/profile/profile.component';


export const routes: Routes = [
  {path: '', redirectTo:'departments', pathMatch: 'full'}, 
  { path: 'departments', component: DepartmentsComponent }, 
  { path: 'about', component: DepartmentsComponent }, // Temporary - Replace with About Component
  { path: 'profile', component: ProfileComponent } 

];
