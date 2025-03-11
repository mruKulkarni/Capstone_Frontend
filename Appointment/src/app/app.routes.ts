import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/user/registration/registration.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'',component:AppComponent},
    {path:'registration',component:RegistrationComponent}
];
