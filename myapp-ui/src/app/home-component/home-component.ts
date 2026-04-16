import { Component } from '@angular/core';
import { ProductComponent } from "../product-component/product-component";
import { ListComponent } from "../list-component/list-component";
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Logo } from "../shared/logo/logo";
import { CallupLogo } from "../shared/callup-logo/callup-logo";
@Component({
    selector: 'app-home-component',
    imports: [
    CommonModule, MenubarModule, RouterModule, ConfirmDialogModule,
    Logo,
    CallupLogo
],
    providers: [ConfirmationService],
    templateUrl: './home-component.html',
    styleUrl: './home-component.css',
})


export class HomeComponent {
    totalRecords: number = 0;
    loading: boolean = true;
    loginUserId: any;
    constructor(private userService: UserService, private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService

    ) {
        this.loginUserId = sessionStorage.getItem("loginUserId");

    }

    productList: any[] = [];
    items: MenuItem[] | undefined;

    ngOnInit() {
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
            },
            {
                label: 'Exp List',
                icon: 'pi pi-server',
                routerLink: ['/exp-list']
            },
            // {
            //     label: 'Contact',
            //     icon: 'pi pi-envelope'
            // },

            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => this.logout()
            },
            {
                label: 'Delete Account',
                icon: 'pi pi-trash',
                command: () => this.confirmDelete()

            }

        ];
    }



    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
    confirmDelete() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this Account?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteAccount();
            },
            reject: () => {
                console.log('Delete cancelled');
            }
        });
    }
    deleteAccount() {
        debugger
            this.userService.deleteAccount(this.loginUserId).subscribe({
                next: (res: any) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Account Deleted successfully'
                    });
                    this.router.navigate(['/login']);

                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Update failed'
                    });
                    this.loading = false;
                }
            });
    }
}


