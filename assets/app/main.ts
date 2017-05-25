import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from "./app.module";
import { DashboardModule } from "./dashboard/dashboard.module";
platformBrowserDynamic().bootstrapModule(DashboardModule);
platformBrowserDynamic().bootstrapModule(AppModule);
