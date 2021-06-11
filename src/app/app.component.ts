/*********************************************************************************
*	WEB422 – Assignment 04
*	I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
*	assignment has been copied manually or electronically from any other source (including web sites) or
*	distributed to other students.
*
*	Name: Alexander Balandin	Student ID: 132145194	Date: 3/21/2021 	
*
********************************************************************************/

import { Component, OnInit } from '@angular/core';
import {Event, NavigationStart, Router} from '@angular/router'
import { AuthService } from './auth.service';
import {GuardAuthService} from './guard-auth.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token: any;
  title = 'assignment4';
  searchString: String;
  constructor(private router: Router, private auth: AuthService){}
  ngOnInit(): void {
    
    this.router.events.subscribe((event:Event)=>{
      
      if(event instanceof NavigationStart){
        this.token = this.auth.readToken();
        console.log(this.token);
      }
    })
  }
  handleSearch(): void{
      this.router.navigate(['/search'], {queryParams: {q: this.searchString}} );
      this.searchString = "";
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
