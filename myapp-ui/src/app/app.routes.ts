import { Routes } from '@angular/router';
import { UserComponent } from './user.component/user.component';
import { ProductComponent } from './product-component/product-component';
import { HomeComponent } from './home-component/home-component';
import { ListComponent } from './list-component/list-component';
import { ExpListComponent } from './exp-list-component/exp-list-component';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: UserComponent
  },


  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'product', component: ProductComponent },
      { path: 'list', component: ListComponent },
      { path: 'exp-list', component: ExpListComponent }
    ]
  }
];