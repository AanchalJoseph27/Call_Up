// app.module.ts
import { NgModule } from '@angular/core';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [ ],
  imports: [
    // BrowserModule,
    // FormsModule,
    // DropdownModule,
    // CalendarModule,
    // InputTextModule,
    // ButtonModule,
    // CardModule, 
    //  DialogModule,
  ],
  bootstrap: [],
  providers: [UserService], // optional since providedIn: 'root'
})
export class AppModule { }
