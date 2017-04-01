import { Component } from '@angular/core';
import { AuthService } from "./auth.service";
import {AvisFComponent} from './avis/avisF.component';
@Component({
    selector: 'app-authentication',
    templateUrl: 'authentication.component.html',
    styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent{
    constructor(private authService: AuthService) {}
    isLogedIn() {
        return this.authService.isLogedIn();
    }
}