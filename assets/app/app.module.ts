import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {routing} from "./app.routing";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header.component";
import { aProposComponent } from "./aPropos/aPropos.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { SignInComponent } from "./auth/signin.component";
import { SignUpComponent } from "./auth/signup.component";
import { AuthService } from "./auth/auth.service";
import { ErrorService } from "./error/error.service";
import { ErrorComponent } from "./error/error.component";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {AvisComponent} from "./auth/avis/avis.component";
import {AvisInputComponent} from "./auth/avis/avisinput.component";
import {AvisListComponent} from "./auth/avis/avislist.component";
import {Avis} from "./auth/avis/avis.model";
import {AvisService} from "./auth/avis/avis.service";
import {AvisFComponent} from "./auth/avis/avisF.component";
import { CookieService } from 'angular2-cookie/services/cookies.service';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        aProposComponent,
        AuthenticationComponent,
        SignInComponent,
        SignUpComponent,
        ErrorComponent,
        AvisComponent,
        AvisInputComponent,
        AvisListComponent,
        AvisFComponent,
        
    ],
    providers: [AuthService, ErrorService,CookieService, AvisService],
    imports: [
        BrowserModule, 
        routing,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
    
}