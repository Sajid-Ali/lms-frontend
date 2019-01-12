import { Component, OnInit } from '@angular/core';
import {RequestHandlerService} from '../../Services/request-handler.service';
import {TokenService} from '../../Services/token.service';

@Component({
  selector: 'app-your-orders',
  templateUrl: './your-orders.component.html',
  styleUrls: ['./your-orders.component.css']
})
export class YourOrdersComponent implements OnInit {

  yourOrders;
  constructor(private requestHandler: RequestHandlerService, private tokenHandler: TokenService) { }

  ngOnInit() {
    this.requestHandler.getYourOrders(this.tokenHandler.getUserTokenHandler().id).subscribe(
        orders => {
          this.yourOrders = orders;
        }
    );
  }

}
