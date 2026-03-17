import { Routes } from '@angular/router';
import { UserComponent } from './user.component/user.component';
import { ProductComponent } from './product-component/product-component';
import { HomeComponent } from './home-component/home-component';
import { ListComponent } from './list-component/list-component';
import { ExpListComponent } from './exp-list-component/exp-list-component';



export const routes: Routes = [
    // {
    //     path: 'login',
    //     component: UserComponent
    // },

    // 👇 LOAD LOGIN FIRST
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 👇 LOGIN (no menubar)
  {
    path: 'login',
    component: UserComponent
  },

  // 👇 ALL OTHER PAGES WITH MENUBAR
    {
        path: '',
        component: HomeComponent,
        children: [
            //   { path: '', component: ProductComponent },
            { path: 'product', component: ProductComponent },
            { path: 'list', component: ListComponent },
            { path: 'exp-list', component: ExpListComponent }
        ]
    }

    
];