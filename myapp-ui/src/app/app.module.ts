import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { UserService } from './services/user.service'; // <-- correct path
// import { UserComponent } from './user.component/user.component';
import { AppComponent } from './app.component';
import { UserComponent } from './user.component/user.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    
  ],
  providers: [UserService], // optional since providedIn: 'root'
})
export class AppModule { }
