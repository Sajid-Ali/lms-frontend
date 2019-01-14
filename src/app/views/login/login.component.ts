import {Component, OnInit} from '@angular/core';
import {RequestHandlerService} from '../../Services/request-handler.service';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';
import {ObserverService} from '../../Services/observer.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    public form = {
        email: null,
        password: null
    };
    public error = null;

    constructor(
        private requestHandler: RequestHandlerService,
        private tokenService: TokenService,
        private router: Router,
        private observer: ObserverService
    ) {
    }

    ngOnInit() {

    }

    onSubmit() {
        return this.requestHandler.login(this.form).subscribe(
            data => this.handleToken(data),
            error => this.error = error.error.error
        );
    }

    handleToken(token) {
        this.tokenService.tokenHandler(token.access_token);
        this.tokenService.setUserTokenHandler(token.user);
        this.observer.changeAuthStatus(true);
        this.requestHandler.getUserAccount(this.tokenService.getUserTokenHandler().id).subscribe(
            data => this.observer.changeBalance(data)
        );
        if (this.tokenService.getUserTokenHandler().role === 'admin') {
            this.router.navigateByUrl('/admin');
        } else {
            this.router.navigateByUrl('/');
        }

    }


}
