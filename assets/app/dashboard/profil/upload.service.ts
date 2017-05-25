import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { ProgressHttp } from "angular-progress-http";
import { Observable } from "rxjs";
import { CookieService } from "angular2-cookie/core";
import { ErrorService } from "../../error/error.service";
import 'rxjs/Rx';

@Injectable()
export class UploadService {
    constructor(
        private http: Http,
        private errorService: ErrorService) {}
   uploadImage(file: any) {
        return this.http.post('http://pfa01-xcapo32.c9users.io/photo' ,file)
            .map((response: Response) => {
                this.errorService.handleError({title: response.json().title, text: response.json().message, type: 'success'});//creating an alert success
                return response.json();
            })
            .catch((error: Response) => {
                this.errorService.handleError({title: error.json().title, text: error.json().message, type: 'error'})//creating an alert error;
                return Observable.throw(error.json())//To like map for the success case , this allows to handel errors ,,,, we added (Observable) because catch() operator dont return Observable object
            });
   }
}
   
