import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { PigeonsComponent } from './pigeons.component';
import { PigeonDetailComponent } from './pigeon-detail.component';
import { PigeonService } from './pigeon.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PigeonsComponent,
    PigeonDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [PigeonService], // tells Angular to create a fresh instance of the PigeonService when it creates PigeonsComponent. The PigeonsComponent, as well as it's child components can use that service to get pigeon data.
  bootstrap: [AppComponent]
})


export class AppModule { }
