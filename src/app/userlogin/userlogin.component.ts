import {Component} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent {

  title = 'clientchatfrontend';
  roomVal="JavaScript";
    alertsDismiss: any = [];
    constructor(private http: HttpClient,private router:Router,private activatedRoute:ActivatedRoute) {}
    submit(value: any) {
      console.log(value);
      this.router.navigate( [ "chat/"+value.username+"/"+value.room ] );
    }

}
