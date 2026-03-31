import { Routes } from '@angular/router';
import { UserComponent } from './user.component/user.component';
import { ProductComponent } from './product-component/product-component';
import { HomeComponent } from './home-component/home-component';
import { ListComponent } from './list-component/list-component';
import { ExpListComponent } from './exp-list-component/exp-list-component';
import { authGuard } from './auth-guard';

export const routes: Routes = [

  // redirect to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // login (no guard)
  {
    path: 'login',
    component: UserComponent
  },

  // 🔐 PROTECTED ROUTES
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard], // ✅ APPLY HERE
    children: [
      { path: 'product', component: ProductComponent },
      { path: 'list', component: ListComponent },
      { path: 'exp-list', component: ExpListComponent }
    ]
  }
];