import { Routes,RouterModule } from "@angular/router";
import { ProfilComponent } from "./profil/profil.component";
import { HistoriqueComponent } from "./historique/historique.component";
import { HISTORY_ROUTES} from "./historique/historique.routes";
const DASHBOARD_ROUTES: Routes= [
    { path: '', redirectTo: '/profil', pathMatch: 'full' },
    { path: 'profil', component: ProfilComponent },
    { path: 'historique', component: HistoriqueComponent , children: HISTORY_ROUTES },
    { path: '**', redirectTo: '/profil' }
];
export const routing=RouterModule.forRoot(DASHBOARD_ROUTES);