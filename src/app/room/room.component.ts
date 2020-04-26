import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class RoomComponent implements OnInit {
  public username:string;
  public chatrooms = [{name:"JavaScript"},{name:"Python"},{name:"PHP"},{name:"Java"},{name:"C#"},{name:"Ruby"}];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
  }

}
