import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { PigeonsComponent } from './pigeons.component';
import { PigeonDetailComponent } from './pigeon-detail.component';

import { PigeonService } from './pigeon.service';

const routes: Routes =[
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'pigeons', component: PigeonsComponent },
    { path: 'detail/:id', component: PigeonDetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
