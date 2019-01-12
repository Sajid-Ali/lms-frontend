import {Component, OnInit} from '@angular/core';
import {ObserverService} from 'src/app/Services/observer.service';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

    isLoggedIn: Boolean;

    constructor(private observer: ObserverService) {
    }

    ngOnInit() {
        this.observer.authStatus.subscribe(
            data => this.isLoggedIn = data
        );

    }

}
