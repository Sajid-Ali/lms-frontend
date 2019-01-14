import {Component, OnInit} from '@angular/core';
import {RequestHandlerService} from '../../Services/request-handler.service';

@Component({
    selector: 'app-admin-registered-users',
    templateUrl: './admin-registered-users.component.html',
    styleUrls: ['./admin-registered-users.component.css']
})
export class AdminRegisteredUsersComponent implements OnInit {

    users;

    constructor(private requestHandler: RequestHandlerService) {
        this.requestHandler.getAllUsers().subscribe(
            users => this.users = users
        );
    }

    ngOnInit() {

    }

}
