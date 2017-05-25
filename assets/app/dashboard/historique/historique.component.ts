import { Component } from '@angular/core';
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'my-historique',
    templateUrl: './historique.component.html'
})
export class HistoriqueComponent {
    constructor(private authService: AuthService) {}
    getUser(){
        return this.authService.getUser();
    }
}