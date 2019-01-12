import { Component, OnInit } from '@angular/core';
import { RequestHandlerService } from '../../../Services/request-handler.service';
import { TokenService } from 'src/app/Services/token.service';
import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';

@Component({
  selector: 'app-course-enroll',
  templateUrl: './course-enroll.component.html',
  styleUrls: ['./course-enroll.component.css']
})
export class CourseEnrollComponent implements OnInit {

  private userId;
  private isEnrolled;
  private enrolledCourses;
  constructor(
    private requestHandler: RequestHandlerService,
    private tokenHandler: TokenService,
    private router: Router
    ) { }

  ngOnInit() {
    this.userId = this.tokenHandler.getUserTokenHandler().id;
    this.requestHandler.getEnrolledCourses(this.userId).subscribe(
      data => {
        this.enrolledCourses = data;
        this.isEnrolled = Object.keys(data).length !==0;
      },
      error => console.log(error.error.error)
    );

  }

  goToClass(id) {
    this.router.navigateByUrl(`user/classroom/${id}`);
  }

}
