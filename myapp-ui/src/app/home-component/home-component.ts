import { Component } from '@angular/core';
import { ProductComponent } from "../product-component/product-component";
import { ListComponent } from "../list-component/list-component";
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
    selector: 'app-home-component',
    imports: [
        CommonModule, MenubarModule, RouterModule,
    ],
    templateUrl: './home-component.html',
    styleUrl: './home-component.css',
})


export class HomeComponent {
    constructor(private userService: UserService, private router: Router) { }

    // data: any;
    // user_id?: number;


    items: MenuItem[] | undefined;

    ngOnInit() {

        // this.loadUsers();
        // console.log(this.userService.getUsers());
        // debugger
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
                        label: 'Exp List',
                        icon: 'pi pi-server',
                        routerLink:['/exp-list']
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

    // loadUsers() {
    //     debugger
    //     const user = this.userService.getUsers().subscribe({
    //         next: (response) => {
    //             this.data = response;
    //             if (this.data != null) {
    //                 this.user_id = this.data.id;

    //             }
    //         }

    //     });
    // }

}


