import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RequestHandlerService} from '../../../Services/request-handler.service';

@Component({
    selector: 'app-response-reset-password',
    templateUrl: './response-reset-password.component.html',
    styleUrls: ['./response-reset-password.component.css']
})
export class ResponseResetPasswordComponent implements OnInit {

    data = {
        email: null,
        password: null,
        password_confirmation: null,
        resetToken: null
    };

    constructor(
        private activatedRoute: ActivatedRoute,
        private requestHandler: RequestHandlerService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(
            params => {
                this.data.resetToken = params['token'];
            }
        );
    }

    onSubmit() {
        this.requestHandler.setNewPassword(this.data).subscribe(
            data => this.handleResponse(data)
        );
    }

    handleResponse(data) {
        console.log(data);
        this.router.navigateByUrl('/login');
    }

}
