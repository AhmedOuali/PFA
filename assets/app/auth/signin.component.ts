import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { ErrorService } from "../error/error.service";
import { Router } from "@angular/router";
import { User } from "./user.model";
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
        private errorService: ErrorService) {}
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
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/auth');
                    console.log('done');
                },
                error => {
                    error => console.error(error)
                }
            );
        this.myForm.reset();
    }
}