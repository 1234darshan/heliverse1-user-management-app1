import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserFiltersComponent } from './user-filters/user-filters.component';
import { UserService } from './user.service.service';

@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    UserFiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule 
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
