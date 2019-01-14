import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RequestHandlerService} from '../../Services/request-handler.service';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-admin-categories',
    templateUrl: './admin-categories.component.html',
    styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

    @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef;
    @ViewChild('closeEditModal') closeEditModal: ElementRef;
    categories;
    cat_id;
    category = {
        id: null,
        name: null
    };

    constructor(private requestHandler: RequestHandlerService) {
        this.requestHandler.getAllCategories().subscribe(
            categories => this.categories = categories
        );
    }

    ngOnInit() {
    }

    onSubmit(form: NgForm) {
        console.log('category id', this.cat_id);
        this.requestHandler.createCategory(this.category).subscribe(
            categories => this.categories = categories
        );

        form.resetForm();
    }

    setCatId(category_id) {
        this.cat_id = category_id;
    }

    deleteCategory() {
        this.requestHandler.deleteCategory(this.cat_id).subscribe(
            categories => this.categories = categories
        );

        const closeBtn = this.closeDeleteModal.nativeElement;
        closeBtn.click();

    }

    editCategory(form: NgForm) {
        this.category.id = this.cat_id;
        this.requestHandler.editCategory(this.category).subscribe(
            categories => this.categories = categories
        );

        const closeBtn = this.closeEditModal.nativeElement;
        closeBtn.click();
        form.resetForm();

    }

}
