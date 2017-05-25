import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { ErrorService } from "../error/error.service";
import { Observable } from "rxjs";
import { CookieService } from "angular2-cookie/core";
import 'rxjs/Rx';


@Injectable() //To inject sevice to an other service
export class AuthService{
    constructor(
        private http: Http,
        private errorService: ErrorService,
        private cookieService:CookieService){}
    
    signup(user: User){
        const body = JSON.stringify(user);
        const headers= new Headers({'content-type': 'application/json'}); // setting up the content-type because it text/plain as default value
                                                 //if localStorage.getItem(token) == null
        return this.http.post('http://pfa01-xcapo32.c9users.io/user' , body, {headers: headers})
            .map((response: Response) => {
                this.errorService.handleError({title: response.json().title, text: response.json().message, type: 'success'});//creating an alert success
                
                return response.json();
            })
            .catch((error: Response) => {
                this.errorService.handleError({title: error.json().title, text: error.json().message, type: 'error'})//creating an alert error;
                return Observable.throw(error.json())//To like map for the success case , this allows to handel errors ,,,, we added (Observable) because catch() operator dont return Observable object
            });
    }
    
    signin(user: User){
        const body = JSON.stringify(user);
        const headers= new Headers({'content-type': 'application/json'}); // setting up the content-type because it text/plain as default value
        console.log(body);
        return this.http.post('http://pfa01-xcapo32.c9users.io/user/signin', body, {headers: headers})
            .map((response: Response) => {
                this.errorService.handleError({title: response.json().title, text: response.json().message, type: 'success'});//creating an alert success
                return response.json();
            })
            .catch((error: Response) => {
                this.errorService.handleError({title: error.json().title, text: error.json().message, type: 'error'}); //creating an alert error
                return Observable.throw(error.json())//To like map for the success case , this allows to handel errors ,,,, we added (Observable) because catch() operator dont return Observable object
            }); 
    }
      updateUser(user:User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://pfa01-xcapo32.c9users.io/user/updateUser' , body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    
    logout() {
        localStorage.clear();
        this.cookieService.removeAll();
    }
    
    isLogedIn() {
        return this.cookieService.get('token') != null;
    }
    getUser(){
        return {
            token: this.cookieService.get('token'),
            firstName: this.cookieService.get('firstName'),
            lastName: this.cookieService.get('lastName'),
            id: this.cookieService.get('user_id'),
            email:this.cookieService.get('email'),
            departement:this.cookieService.get('departement'),
            phone:this.cookieService.get('phone')
        }
    }
    
    
}