import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { RoomComponent } from './room/room.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    RoomComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
