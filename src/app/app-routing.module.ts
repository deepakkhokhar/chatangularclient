import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from "./chat/chat.component";
import { LoginComponent } from './login/login.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full',
},
{
  path: 'login',
  component: LoginComponent,
  data: {
    title: 'Login'
  }
},
{
  path: 'room/:username',
  component: RoomComponent,
  data: {
    title: 'Room'
  }
}
,{
  path: 'chat/:username/:room',
  component: ChatComponent,
  data: {
    title: 'Chat'
  }
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
