import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetConfig } from 'ngx-bootstrap/tabs';
import * as io from 'socket.io-client';

// such override allows to keep some initial values
 
export function getTabsetConfig(): TabsetConfig {
  return Object.assign(new TabsetConfig(), { type: 'pills' });
}
declare let window: any; 
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [{ provide: TabsetConfig, useFactory: getTabsetConfig }]
})
export class ChatComponent implements OnInit {
  
  public username:string;
  chatbox:string;
  public room:string;
  public socket;
  public imagePath;
  imgURL: any;
  public message: string;
  constructor(private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.room = this.route.snapshot.paramMap.get('room'); 
    const chatMessages = document.querySelector('.chat-list');
    this.socket = io('http://localhost:3000');
    this.socket.emit('joinRoom', { username:this.username, room:this.room });
    this.socket.on('roomUsers', ({ room, users }) => {
      console.log(room);
      //this.outputRoomName(room);
      this.outputUsers(users);
    });

    // Message from server
    this.socket.on('message', message => {
      this.outputMessage(message);

      // Scroll down
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    this.socket.on('image', message => {
      console.log(message);
      this.outputImage(message);

      // Scroll down
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  keyPress(event: any) {
    console.log(event);
    if(event.which === 13 && !event.shiftKey){
      this.sendMessage();
      event.preventDefault();
    }
  }
  
  getMedia() {
    let constraints: MediaStreamConstraints = {
      video: true,
      audio: true
    };
    const video = <HTMLVideoElement>(document.querySelector('div#localVideo video'));
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
      console.log('Got mic+video stream', stream);
      document.getElementById('videoDisplay').style.display = "block";
      video.srcObject = stream;
    })
    .catch (function (err) {
      console.error(err);
  });
  }

  stopMedia(){
    const video = <HTMLVideoElement>(document.querySelector('div#localVideo video'));
    document.getElementById('videoDisplay').style.display = "none";
    (<MediaStream>video.srcObject).getTracks().forEach( stream => stream.stop());
    video.srcObject = null;
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
        var jsonObject = {
          'imageData': reader.result,
         // 'username': this.username,
          //'room':this.room
      }

      this.socket.emit('user image', jsonObject);

    }
  }

    // Add room name to DOM
/*outputRoomName(room) {
  const roomName = document.getElementById('room-name');
   roomName.innerText = room;
}*/


// Output message to DOM
outputImage(message) {
  const li = document.createElement('li');
  li.classList.add('message-list');
  li.classList.add('odd-message-list');
  li.innerHTML = `<i class="fa fa-user"></i> ${message.username}: <img src='${message.text}'>`;
  document.querySelector('.chat-list').appendChild(li);
}

outputMessage(message) {
  const li = document.createElement('li');
  li.classList.add('message-list');
  li.classList.add('odd-message-list');
  li.innerHTML = `<i class="fa fa-user"></i> ${message.username}: ${message.text.replace(/\n\r?/g, "<br />")}`;
  document.querySelector('.chat-list').appendChild(li);
}

// Add users to DOM
outputUsers(users) {
  const userList = document.getElementById('chat-list-feature-user');
  userList.innerHTML = `
    ${users.map(user => `<li class="room-feature-list odd-feature-list"><button class="btn room-icon-feature"><i
    class="fa fa-wechat fa-2x"></i></button> ${user.username} (1)
<i class="fa fa-video-camera " title="Video Friendly Room"></i>
<i class="fa fa-microphone " title="Audio Friendly Room"></i>
</li>`).join('')}
  `;
}

sendMessage(){
 if(this.chatbox){
 this.socket.emit('chatMessage', this.chatbox);
 this.chatbox='';
 }
}

Newline(){
  this.chatbox=this.chatbox+'\n';
  document.getElementById('chatbox').focus();
}

}
