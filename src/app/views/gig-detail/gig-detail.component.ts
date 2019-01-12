import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestHandlerService} from '../../Services/request-handler.service';
import {TokenService} from '../../Services/token.service';
import {tokenize} from '@angular/compiler/src/ml_parser/lexer';

@Component({
    selector: 'app-gig-detail',
    templateUrl: './gig-detail.component.html',
    styleUrls: ['./gig-detail.component.css']
})
export class GigDetailComponent implements OnInit {

    data = {
        id: null,
        title: '',
        description: '',
        category_id: '',
        image: '',
        price: '',
        duration: '',
        user_id: ''
    };

    private gigId;
    private gig;
    @ViewChild('modalCloseBtn') closeButton: ElementRef;
    modal;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private requestHandler: RequestHandlerService,
        private tokenHandler: TokenService
    ) {
    }


    ngOnInit() {
        this.gigId = this.activatedRoute.snapshot.params['id'];
        this.requestHandler.getThisGig(this.gigId).subscribe(
            data => this.gig = data
        );

    }

    isUsersGig(id) {
        if (this.tokenHandler.loggedIn()) {
            return this.tokenHandler.getUserTokenHandler().id === id;
        } else {
            return false;
        }
    }

    orderNow() {
        if (!this.tokenHandler.loggedIn()) {
            this.router.navigateByUrl('register');
        } else {
            const data = {
                gig_id: null,
                user_id: null
            };

            data.gig_id = this.gigId;
            data.user_id = this.tokenHandler.getUserTokenHandler().id;
            console.log('This is data : ', data);
            this.requestHandler.orderNow(data).subscribe(
                order => console.log(order)
            );

        }
    }

    showUpdatedModal() {
        this.data = this.gig;
    }

    onSubmit() {
        this.requestHandler.updateGig(this.data).subscribe(
            data => this.gig = data
        );

        this.modal = this.closeButton.nativeElement;
        this.modal.click();

        console.log(this.data);
    }

}
