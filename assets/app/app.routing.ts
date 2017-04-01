import { Routes,RouterModule } from "@angular/router";
import { AuthenticationComponent } from "./auth/authentication.component";
import { aProposComponent } from "./aPropos/aPropos.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
const APP_ROUTES: Routes= [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    { path: 'aPropos', component: aProposComponent }
];
export const routing=RouterModule.forRoot(APP_ROUTES);