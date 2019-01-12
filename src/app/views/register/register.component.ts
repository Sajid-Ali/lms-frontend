import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestHandlerService } from '../../Services/request-handler.service';
import { Router } from '@angular/router';
import { ObserverService } from '../../Services/observer.service';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error;
  public user = {
    profile_pic: 'https://ucarecdn.com/533e30ec-b783-4e55-99aa-a52805a207b7/istockphoto499602492612x612.jpg',
    firstName: null,
    lastName: null,
    email: null,
    password: null
  };
  constructor(
    private requestHandler: RequestHandlerService,
    private router: Router,
    private tokenService: TokenService,
    private observer: ObserverService

    ) { }

  ngOnInit() {
  }

  onSubmit() {
    return this.requestHandler.register(this.user).subscribe(
      data => this.handle(data),
        error => this.handleError(error)
    );
  }

  handle(data) {
    console.log('****** handle data');
    console.log(data);
    console.log('*****************');
    this.router.navigateByUrl('login');
  }

  handleError(error){
    this.error = error.error.errors;

    console.log(!error.firstName);
  }

}
