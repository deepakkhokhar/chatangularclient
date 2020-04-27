import {Component} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  title = 'clientchatfrontend';
  roomVal="JavaScript";
  usernameVal:string;
    alertsDismiss: any = [];
    constructor(private http: HttpClient,private router:Router,private activatedRoute:ActivatedRoute) {}
    submit(value: any) {
      console.log(value);
     // this.router.navigate( [ "room/"+value.username ] );
    }
}
