import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Response} from '@angular/http';
import {TokenService} from './token.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequestHandlerService {

    constructor(private http: HttpClient, private tokenService: TokenService) {
    }

    // private baseUrl = 'http://localhost:8000/api';
    private baseUrl = 'https://elearn-fyp2.herokuapp.com/api';

    searchByTerm(term) {
        return this.http.get(`${this.baseUrl}/search/${term}`);
    }

    updateProfile(user) {
        return this.http.post(`${this.baseUrl}/user/updateprofile`, user);
    }

    getCourseReview(course_ratting_review) {
        return this.http.post(`${this.baseUrl}/user/course/review`, course_ratting_review);
    }

    getAllReviews(courseId) {
        return this.http.get(`${this.baseUrl}/user/course/review/all/${courseId}`);
    }

    setCourseReview(course_ratting_review) {
        return this.http.post(`${this.baseUrl}/user/course/create/review`, course_ratting_review);
    }

    register(formValue: Object) {
        return this.http.post(`${this.baseUrl}/register`, formValue);
    }

    login(formValue: Object) {
        return this.http.post(`${this.baseUrl}/login`, formValue);
    }

    sendResetPasswordLink(data) {
        return this.http.post(`${this.baseUrl}/login/password/reset`, data);
    }

    setNewPassword(data) {
        return this.http.post(`${this.baseUrl}/login/newpassword`, data);
    }

    getUserAccount(id) {
        return this.http.get(`${this.baseUrl}/user/account/${id}`);
    }

    getAuthUser(token) {
        return this.http.get(`${this.baseUrl}/getAuthUser/${token}`);
    }

    getCourseUser(id) {
        return this.http.get(`${this.baseUrl}/course/user/${id}`);
    }

    loggedOut() {
        return this.http.post(`${this.baseUrl}/logout`, this.getToken());
    }

    getToken() {
        return this.tokenService.get('token');
    }

    /* get categories from api */

    getCategories() {
        return this.http.get(`${this.baseUrl}/categories`);
    }

    /* Get Courses of Category */

    getCourseOfCategory(category_id) {
        return this.http.get(`${this.baseUrl}/course/category/${category_id}`);
    }

    createCourse(data) {
        return this.http.post(`${this.baseUrl}/course/create`, data);
    }

    setCourseInfo(data) {
        return this.http.post(`${this.baseUrl}/course/create/info`, data);
    }

    getCourseInfo(courseId) {
        return this.http.get(`${this.baseUrl}/course/courseInfo/${courseId}`);
    }

    getAllCourses() {
        return this.http.get(`${this.baseUrl}/course/all`);
    }

    getEnrolledCourses(userId) {
        return this.http.get(`${this.baseUrl}/course/enroll/${userId}`);
    }

    getMyCourse(userId) {
        return this.http.get(`${this.baseUrl}/course/mycourse/${userId}`);
    }

    getThisCourse(data) {
        return this.http.get(`${this.baseUrl}/course/get/${data}`);
    }

    getCourseModules(courseId) {
        return this.http.get(`${this.baseUrl}/course/${courseId}/modules`);
    }

    // Upload videos to course

    uploadCourseVideo(videoData) {
        return this.http.post(`${this.baseUrl}/course/video/upload`, videoData);
    }

    // Get videos from api

    getVideosFromApi(courseId) {
        return this.http.get(`${this.baseUrl}/course/videos/${courseId}`);
    }

    isCourseEnrolled(course_id, userId) {
        return this.http.get(`${this.baseUrl}/course/getEnrolled/${course_id}/${userId}`);
    }

    /* Enroll Course */

    enrollInCourse(data) {
        return this.http.post(`${this.baseUrl}/course/enroll`, data);
    }

    /*
    *
    * Buy Course
     */

    buyCourse(data) {
        return this.http.post(`${this.baseUrl}/course/buyCourse`, data);
    }

    /*

    Live Course
     */

    goLive(courseId) {
        return this.http.get(`${this.baseUrl}/course/live/${courseId}`);
    }

    getOpenTokToken(courseId) {
        return this.http.get(`${this.baseUrl}/enrolledCourse/live/${courseId}`);
    }

    /*

     Gig Section
     */

    /*
    Create Gig
     */
    getAllGigs() {
        return this.http.get(`${this.baseUrl}/gig/all`);
    }

    getGigOfCategory(category_id) {
        return this.http.get(`${this.baseUrl}/gig/category/${category_id}`);
    }

    getUserGigs() {
        return this.http.get(`${this.baseUrl}/gig/mygig/${this.tokenService.getUserTokenHandler().id}`);
    }

    createGig(data) {
        return this.http.post(`${this.baseUrl}/gig/create`, data);
    }

    getThisGig(id) {
        return this.http.get(`${this.baseUrl}/gig/get/${id}`);
    }

    updateGig(data) {
        return this.http.post(`${this.baseUrl}/gig/update`, data);
    }

    deleteGig(id) {
        return this.http.get(`${this.baseUrl}/gig/delete/${id}`);
    }

    /*

    Gig Order
     */

    orderNow(data) {
        return this.http.post(`${this.baseUrl}/gig/order`, data);
    }

    getYourOrders(id) {
        return this.http.get(`${this.baseUrl}/user/orders/yourorders/${id}`);
    }

    getOrdersFromYou(id) {
        return this.http.get(`${this.baseUrl}/user/orders/orderFromYou/${id}`);
    }

}
