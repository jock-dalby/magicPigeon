import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Pigeon } from './pigeon';
import { PigeonService } from './pigeon.service';

@Component({
  selector: 'pigeons',
  templateUrl: 'pigeons.component.html',
  styleUrls: ['./app.component.css']
})

export class PigeonsComponent implements OnInit { // component
  pigeons: Pigeon[];
  selectedPigeon: Pigeon;

  constructor(
      private router: Router,
      private pigeonService: PigeonService) {} // This constructor itself does nothing, but the parameter simultaneously defines a private pigeonService property and identifies it as a PigeonService injection. Now Angular knows to create and instance of the PigeonService when it creates an PigeonsComponent. To teach the injector how to make a PigeonService, we add 'providers: [PigeonService]' to the bottom of the component metadata in the @Component call.

  // Constructors should not contain any complex logic, especially a constructor that calls a server, such as a data access method. The constructor is for simple initialisations, like wiring constructor parameters to properties.

  getPigeons(): void {
    // get the data from pigeonService private variable
    this.pigeonService.getPigeons()
        .then(pigeons => this.pigeons = pigeons); // // To coordinate the view with the response, we use Promises, which is an async technique that changes the signature of the getPigeons method. A callback function is passed to the promise to set the components pigeons property to the array of pigeons returned by the service
  }

  ngOnInit(): void { // Will run on itialise. Be sure to import OnInit and add the implementation for the OnInit interface to export statement
    this.getPigeons();
  }

  onSelect(pigeon: Pigeon): void{
    this.selectedPigeon = pigeon;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedPigeon.id]);
  }
}
