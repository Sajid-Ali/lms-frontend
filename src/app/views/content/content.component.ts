import {Component, DoCheck, OnInit} from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

   courses;
   gigs;
  constructor() { }

  ngOnInit() {

  }

  setCourseFromCategory(event) {
    this.courses = event;
  }

  setGigFromCategory(event){
    this.gigs = event;
  }

}
