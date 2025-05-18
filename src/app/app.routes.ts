import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { authGuard, publicGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
    { path: 'search', component: SearchComponent, canActivate: [publicGuard]},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent, canActivate: [publicGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [publicGuard]},
    { path: '', component: HomeComponent},
    { path: '**', component: PageNotFoundComponent},
];
