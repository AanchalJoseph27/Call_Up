import { Component } from '@angular/core';
import { ProductComponent } from "../product-component/product-component";
import { ListComponent } from "../list-component/list-component";
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
    selector: 'app-home-component',
    imports: [
        CommonModule, MenubarModule, RouterModule,
    ],
    templateUrl: './home-component.html',
    styleUrl: './home-component.css',
})


export class HomeComponent {
    constructor(private router: Router) { }

    items: MenuItem[] | undefined;

    ngOnInit() {
        debugger
        this.items = [

            {
                label: 'Products',
                icon: 'pi pi-cart-minus',
                routerLink: ['/product']
            },
            {
                label: 'List',
                icon: 'pi pi-copy',
                routerLink: ['/list'],
                items: [
                    {
                        label: 'Full List',
                        icon: 'pi pi-bolt'
                    },
                    {
                        label: 'Exp List',
                        icon: 'pi pi-server'
                    },

                ]
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope'
            },

            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => this.logout()
            }

        ];
    }


    logout() {

        // Clear session (if using localStorage)
        localStorage.removeItem('user');

        // Redirect to login
        this.router.navigate(['/login']);
    }

}


