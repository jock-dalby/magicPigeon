import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { PigeonsComponent } from './pigeons.component';
import { PigeonDetailComponent } from './pigeon-detail.component';
import { PigeonService } from './pigeon.service';
import { PigeonSearchComponent } from './pigeon-search.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PigeonsComponent,
    PigeonDetailComponent,
    PigeonSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
    // Rather than require a real API server, this example simulates communication with the remote server by adding the InMemoryWebApiModule to the module imports, effectively replacing the Http client's XHR backend service with an in-memory alternative. The forRoot() configuration method takes an InMemoryDataService class that primes the in-memory database.
  ],
  providers: [PigeonService], // tells Angular to create a fresh instance of the PigeonService when it creates PigeonsComponent. The PigeonsComponent, as well as it's child components can use that service to get pigeon data.
  bootstrap: [AppComponent]
})


export class AppModule { }
