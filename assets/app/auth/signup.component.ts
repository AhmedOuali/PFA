import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignUpComponent  {
    myForm: FormGroup;
     constructor(private authService: AuthService) {}
     ngOnInit(){
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
            departement: new  FormControl(null, Validators.required),
            phone:new FormControl(null, Validators.required)
           
        });
    }
    onSubmit(){
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName,
            this.myForm.value.departement,
            this.myForm.value.phone,
            
        );
        console.log(user);
        this.authService.signup(user)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );
        console.log(this.myForm);
        this.myForm.reset();
    }
}