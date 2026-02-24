import { Routes } from '@angular/router';
import { UserComponent } from './user.component/user.component';
import { ProductComponent } from './product-component/product-component';
import { HomeComponent } from './home-component/home-component';
import { ListComponent } from './list-component/list-component';

export const routes: Routes = [
    { path: '', component: UserComponent },
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: 'product', component: ProductComponent },
            { path: 'list', component: ListComponent }
        ]
    }
];
