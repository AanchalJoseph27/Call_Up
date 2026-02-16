import { Component } from '@angular/core';
import { UserComponent } from './user.component/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserComponent],  // import the standalone component here
  template: `<app-user></app-user>`
})
export class AppComponent { }
