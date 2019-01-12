import { Component, OnInit } from '@angular/core';
import {RequestHandlerService} from '../../Services/request-handler.service';
import {TokenService} from '../../Services/token.service';

@Component({
  selector: 'app-ordersfromyou',
  templateUrl: './ordersfromyou.component.html',
  styleUrls: ['./ordersfromyou.component.css']
})
export class OrdersfromyouComponent implements OnInit {

  orders;

  constructor(private requestHandler: RequestHandlerService, private tokenHandler: TokenService) { }

  ngOnInit() {
    this.requestHandler.getOrdersFromYou(this.tokenHandler.getUserTokenHandler().id).subscribe(
        orders => this.orders = orders
    );
  }

}
