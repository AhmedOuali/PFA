import { Component } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";


@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    constructor(private authService: AuthService) {}
    
    logout(){
        this.authService.logout();
    }
    getUser(){
        return this.authService.getUser();
    }
    
    openLeftMenu($scope, $mdSidenav) { 
        $mdSidenav('left').toggle();
    }
}