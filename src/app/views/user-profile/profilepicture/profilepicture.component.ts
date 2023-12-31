import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../../Services/token.service';
import {RequestHandlerService} from '../../../Services/request-handler.service';

@Component({
    selector: 'app-profilepicture',
    templateUrl: './profilepicture.component.html',
    styleUrls: ['./profilepicture.component.css']
})
export class ProfilepictureComponent implements OnInit {

    user;
    updated;

    constructor(private tokenHandler: TokenService, private requestHandler: RequestHandlerService) {
        this.updated = false;
    }

    ngOnInit() {
        this.user = this.tokenHandler.getUserTokenHandler();
    }

    onUploadComplete(f) {
        this.user.profile_pic = f.cdnUrl;
        this.updated = false;
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
        this.updated = true;

        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

}
