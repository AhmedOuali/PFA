import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {routing} from "./dashboard.routing";
import { DashboardComponent } from "./dashboard.component";
import { UploadService } from "./profil/upload.service";
import { ProfilService } from "./profil/profil.service";
import { HeaderComponent } from "./header.component";
import { SidebarComponent } from "./sidebar.component";
import { ProfilComponent } from "./profil/profil.component";
import { HistoriqueComponent } from "./historique/historique.component";
import { AuthService } from "../auth/auth.service";
import { ErrorService } from "../error/error.service";
import { ErrorComponent } from "../error/error.component";
import { HttpModule } from "@angular/http";
import { ProgressHttpModule } from "angular-progress-http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CookieService } from "angular2-cookie/services/cookies.service";
import {CoursComponent} from "./historique/cours.component";
import {SondageComponent} from "./historique/sondage.component";
import {TousComponent} from "./historique/tous.component";





@NgModule({
    declarations: [
        DashboardComponent,
        ErrorComponent,
        HeaderComponent,
        SidebarComponent,
        ProfilComponent,
        HistoriqueComponent,
        CoursComponent,
        SondageComponent,
        TousComponent
    ],
    providers: [AuthService, UploadService, ProfilService, ErrorService, CookieService],
    imports: [
        BrowserModule, 
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        CommonModule,
        ProgressHttpModule
    ],
    bootstrap: [DashboardComponent]
})
export class DashboardModule {
    
}