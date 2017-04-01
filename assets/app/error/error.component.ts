import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ErrorService } from "./error.service"
import { Router } from "@angular/router";
import { Error } from "./error.model";
import { default as swal } from 'sweetalert2';
@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
})
export class ErrorComponent{
    error: Error;
    display = 'none';
    constructor(private errorService: ErrorService) {}
    ngOnInit() {
        this.errorService.errorOccured
            .subscribe(
                (error: Error) => {
                    console.log({error})
                    swal({
                      title: error.title,
                      text: error.text,
                      type: error.type,
                      timer: 5000,
                      confirmButtonText: 'Cool'
                    });
                }
            );
    }
    
}