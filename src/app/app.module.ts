import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';

export const firebaseConfig = {
  apiKey: "AIzaSyByduS-59KYPn3rdloed23hY0bVvimzkgI",
  authDomain: "what-i-do-af8f9.firebaseapp.com",
  databaseURL: "https://what-i-do-af8f9.firebaseio.com",
  storageBucket: "what-i-do-af8f9.appspot.com/",
  messagingSenderId: "764743703692"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
