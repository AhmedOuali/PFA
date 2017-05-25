import { Component,ElementRef, Input } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../../auth/user.model";
import { UploadService } from "./upload.service";
import { ProfilService } from "./profil.service";
import { CookieService } from "angular2-cookie/core";


@Component({
    selector: 'my-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
    myForm: FormGroup;
    imgUrl: string;
    constructor(
        private authService: AuthService,
        private uploadService: UploadService,
        private profilService: ProfilService,
         private cookieService:CookieService,
        private el: ElementRef) {}
    ngOnInit(){
        this.imgUrl= this.getUserPhoto(this.authService.getUser().id);
        this.myForm = new FormGroup({
            file: new FormControl(null, Validators.required),
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
            departement: new  FormControl(null, Validators.required),
            phone:new FormControl(null, Validators.required)
        });
        
        
    }
    
    
    onChange(input:any) {
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('input');
        console.log(inputEl);
    //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
        let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
            formData.append('file', inputEl.files.item(0));
            this.uploadService.uploadImage(formData)
            .subscribe(
                data => {
                    console.log('success');
                    
                },
                error => {
                    console.log('error');
                }
            );
        
       }
    }
    
    logout(){
        this.authService.logout();
    }
    getUser(){
        return this.authService.getUser();
    }
    getUserPhoto(id) {
        
        this.profilService.getProfilImgUrl(id).subscribe(
                data => {
                    this.cookieService.put('usr_photo_url',data.url);
                },
                error => {
                    this.cookieService.put('usr_photo_url',error.url);
                }
            );
        return this.cookieService.get('usr_photo_url');
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
        this.authService.updateUser(user)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );
        console.log(this.myForm);
        this.myForm.reset();
    }
    
    
   
    
}