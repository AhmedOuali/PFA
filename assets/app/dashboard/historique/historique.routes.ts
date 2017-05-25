import { Routes } from "@angular/router";
import { TousComponent } from "./tous.component";
import { CoursComponent } from "./cours.component";
import {SondageComponent } from "./sondage.component";


export const HISTORY_ROUTES: Routes = [
    { path: '', redirectTo: 'tous', pathMatch: 'full'},
    { path: 'tous', component: TousComponent},
    { path: 'sondage', component: SondageComponent},
    { path: 'cours', component: CoursComponent}
];