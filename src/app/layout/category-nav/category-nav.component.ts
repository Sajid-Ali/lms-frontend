import {Component, OnInit, Output, EventEmitter, DoCheck} from '@angular/core';
import {RequestHandlerService} from '../../Services/request-handler.service';

@Component({
    selector: 'app-category-nav',
    templateUrl: './category-nav.component.html',
    styleUrls: ['./category-nav.component.css']
})
export class CategoryNavComponent implements OnInit {

     categories;
     category_id;
    @Output() changeCourse = new EventEmitter();
    @Output() changeGig = new EventEmitter();


    constructor(private requestHandler: RequestHandlerService) {
        this.category_id = 'all';
    }

    ngOnInit() {
        this.requestHandler.getCategories().subscribe(
            data => this.categories = data
        );
        this.requestHandler.getAllCourses().subscribe(
            data => this.changeCourse.emit(data)
        );
        this.requestHandler.getAllGigs().subscribe(
            data => this.changeGig.emit(data)
        );
    }

    getChangedCourse(category_id) {
        this.category_id = category_id;
        this.requestHandler.getCourseOfCategory(category_id).subscribe(
            data => this.changeCourse.emit(data)
        );
        this.requestHandler.getGigOfCategory(category_id).subscribe(
            data => this.changeGig.emit(data)
        );
    }

    getAllCourses() {
        this.category_id = 'all';
        this.requestHandler.getAllCourses().subscribe(
            data => this.changeCourse.emit(data)
        );
        this.requestHandler.getAllGigs().subscribe(
            data => this.changeGig.emit(data)
        );
    }

}
