import {Component, OnInit} from '@angular/core';
import {RequestHandlerService} from '../../../Services/request-handler.service';
import {SnotifyService} from 'ng-snotify';

@Component({
    selector: 'app-resetpassword',
    templateUrl: './resetpassword.component.html',
    styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

    data = {
        email: null
    };

    public success;
    public isLoading = false;

    constructor(private requestHandler: RequestHandlerService, private snotify: SnotifyService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.isLoading = true;
        this.requestHandler.sendResetPasswordLink(this.data).subscribe(
            data => this.handleResponse(data),
            error => this.snotify.error(error.error.error)
        );
    }

    handleResponse(data) {
        this.isLoading = false;
        this.success = data;
    }

}
