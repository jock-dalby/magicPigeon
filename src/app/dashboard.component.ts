import { Component, OnInit } from '@angular/core';

import { Pigeon } from './pigeon';
import { PigeonService } from './pigeon.service';

@Component ({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
    pigeons: Pigeon[] =[];

    constructor(private pigeonService: PigeonService) {}

    ngOnInit(): void {
        this.pigeonService.getPigeons().then(pigeons => this.pigeons = pigeons.slice(1, 5));
    }
}