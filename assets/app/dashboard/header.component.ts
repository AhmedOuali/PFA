import { Component } from '@angular/core';
import { AuthService } from "../auth/auth.service";



@Component({
    selector: 'my-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(private authService: AuthService) {}
    logout(){
        this.authService.logout();
    }
}