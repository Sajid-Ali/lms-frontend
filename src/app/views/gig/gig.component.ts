import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RequestHandlerService} from '../../Services/request-handler.service';
import {TokenService} from '../../Services/token.service';

@Component({
    selector: 'app-gig',
    templateUrl: './gig.component.html',
    styleUrls: ['./gig.component.css']
})
export class GigComponent implements OnInit {

    data = {
        title: '',
        description: '',
        category_id: '',
        image: '',
        price: '',
        duration: '',
        user_id: ''
    };

    gigs;
    @ViewChild('modalCloseBtn') closeButton: ElementRef;
    modal;

    constructor(private requestHandler: RequestHandlerService, private tokenHandler: TokenService) {
        this.data.user_id = this.tokenHandler.getUserTokenHandler().id;
    }

    ngOnInit() {
        this.requestHandler.getUserGigs().subscribe(
            data => this.gigs = data
        );
    }

    onUploadComplete(event) {
        this.data.image = event.cdnUrl;
    }

    onSubmit() {
        this.requestHandler.createGig(this.data).subscribe(
            data => this.gigs = data
        );
        this.modal = this.closeButton.nativeElement;
        this.modal.click();
    }

    deleteGig(id) {
        this.requestHandler.deleteGig(id).subscribe(
            gigs => this.gigs = gigs
        );

    }
}
