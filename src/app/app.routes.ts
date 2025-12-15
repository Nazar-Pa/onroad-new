import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { PublishRideComponent } from './publish-ride/publish-ride.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './sevices/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'search-result',
    component: SearchResultComponent
  },
  {
    path: 'publish-ride',
    component: PublishRideComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];
