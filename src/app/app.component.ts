import { Component, Input, OnChanges, SimpleChange  } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';

import { trigger, state, style, animate, transition, group, keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'scale(1) rotate(0deg) translateX(0)', opacity:1 })),
      transition('void => *', [
          style({transform: 'scale(1) rotate(0deg) translateX(100%)', 
                opacity:1
              }),
          animate('0.2s 0.1s ease-in')
        ]),
      transition('* => void', [
          style({transform: 'scale(1.2) rotate(0deg) translateX(0)'}),
          animate('0.6s 0.1s ease-out', style({transform: 'scale(0) rotate(-720deg) translateX(0)', opacity:0}))
        ])
    ]),

    trigger('spin', [
        state('onmouseover', style({
          transform: 'rotate(90deg)'
        })),
        state('onmouseout',   style({
          transform: 'rotate(0deg)'
        })),
        transition('onmouseover => onmouseout', animate('0.3s ease')),
        transition('onmouseout => onmouseover', animate('0.3s ease'))
      ])

  ]
})

export class AppComponent {

  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';
  
  
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.items = af.list('/messages', {
      query: {
        limitToLast: 50
      }
    });
    
    this.user = this.afAuth.authState;

  }

  login() {
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  Send(desc: string, valid: boolean) {
    if (!valid) 
      return;
    this.items.push({ message: desc});
    this.msgVal = '';        
  }

  Delete(key: string) {
    this.items.remove(key);
  }

  Move () {

  }

state: string = '';
key: string = '';
rotation (st: string, key: string) {   
    this.state = st;
    this.key = key;
  }

getRotation = (key: string) => key == this.key ? this.state : "onmouseout";

animationDone (event: any){
  if (event) 
    console.log('is over');
}

animationStart (event: any){
  if (event) 
    console.log('is started');
}

 form;
  ngOnInit () {
    this.form = new FormGroup ({
      message: new FormControl( '', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        //Validators.pattern('[\\w\\-\\s\\/]+')        
      ])) 
    });
  }

  
}
