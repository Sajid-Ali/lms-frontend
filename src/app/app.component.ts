import {Component, OnInit} from '@angular/core';
import {TokenService} from './Services/token.service';
import {ObserverService} from './Services/observer.service';
import {RequestHandlerService} from './Services/request-handler.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
     userData;
     loggedIn;
     balance;

    constructor(private observer: ObserverService) {
    }

    ngOnInit() {
        this.observer.authStatus.subscribe(
            data => this.loggedIn = data
        );
        this.observer.balanceStatus.subscribe(
            data => this.balance = data
        );
    }
}
