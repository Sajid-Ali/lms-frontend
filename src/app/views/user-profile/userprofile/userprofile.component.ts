import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../Services/token.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user;
  constructor(private tokenHandler: TokenService ) {
    this.user = this.tokenHandler.getUserTokenHandler();
  }

  ngOnInit() {
  }

}
