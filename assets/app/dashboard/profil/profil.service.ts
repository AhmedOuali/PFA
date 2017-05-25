import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
@Injectable() //To inject sevice to an other service
export class ProfilService{
    constructor(
        private http: Http){}

    getProfilImgUrl(id: string){
        
        
             return this.http.get('http://pfa01-xcapo32.c9users.io/filetest-'+id+'.jpg')
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())//To like map for the success case , this allows to handel errors ,,,, we added (Observable) because catch() operator dont return Observable object
            });
    }
}
    