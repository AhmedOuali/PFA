import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { ErrorService } from "../error/error.service";
import { Router } from "@angular/router";
import { Http, Headers, Response} from "@angular/http";
import { User } from "./user.model";
import { CookieService } from "angular2-cookie/core";
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent{
     myForm: FormGroup;
    constructor(
        private authService: AuthService, 
        private router: Router,
        private errorService: ErrorService,
        private http: Http,
        private cookieService:CookieService
        ) {}
    ngOnInit(){
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[^@\s]+@[^@\s]+\.[^@\s]+")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
    onSubmit(){
        const user = new User(this.myForm.value.email,this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    this.cookieService.put('token',data.token);
                    this.cookieService.put('firstName',data.firstName);
                    this.cookieService.put('lastName',data.lastName);
                    this.cookieService.put('user_id',data.userId);
                    
                    localStorage.setItem('userId', data.userId);
                    window.location.href='http://pfa01-xcapo32.c9users.io/profil';
                },
                error => {
                    error => console.error(error)
                }
            );
        this.myForm.reset();
    }
}