import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../../Services/token.service';
import {RequestHandlerService} from '../../../Services/request-handler.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    user;

    constructor(private tokenHandler: TokenService, private requestHandler: RequestHandlerService) {
    }

    ngOnInit() {
        this.user = this.tokenHandler.getUserTokenHandler();
    }

    onSubmit() {
        const userWithToken = {
            id: this.user.id,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            password: this.user.password,
            biography: this.user.biography,
            profile_pic: this.user.profile_pic,
            token: this.tokenHandler.get('token')
        };
        this.requestHandler.updateProfile(userWithToken).subscribe(
            user => {
                this.handleToken(user);
                console.log(user);
                console.log('successfully updated');
            }
        );
    }

    handleToken(token) {
        this.tokenHandler.tokenHandler(token.access_token);
        this.tokenHandler.setUserTokenHandler(token.user);
    }

}
