import { Component, OnInit } from '@angular/core';
import { ObserverService } from '../../Services/observer.service';
import { TokenService } from '../../Services/token.service';
import { RequestHandlerService } from '../../Services/request-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private loggedIn:Boolean;
  private authUser;

  constructor(
    private observer:ObserverService,
    private tokenService:TokenService,
    private requestHandlerService:RequestHandlerService,
    private router:Router
    
    ) { }

  ngOnInit() {
    this.observer.authStatus.subscribe(
      data =>this.loggedIn = data
    );
    
    this.authUser = this.tokenService.getUserTokenHandler();
  }

  logOut(event:MouseEvent){
    event.preventDefault();
    this.tokenService.remove();
    this.observer.changeAuthStatus(false);
  }

  handleRequest(data){
    this.tokenService.remove();
    this.observer.changeAuthStatus(false);
    this.router.navigateByUrl('/');
  }
  

}
