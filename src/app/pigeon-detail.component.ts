import { Component, Input, OnInit } from '@angular/core'; // To define a component, you always import the Component symbol.

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { PigeonService } from './pigeon.service';

import { Pigeon } from './pigeon';

@Component({ // The @Component decorator provides the Angular metadata for the component.
    selector: 'pigeon-detail',  // The CSS selector name, pigeon-detail, wil match the element
                                // tag that identifies this component within a parent's component template.
    templateUrl: './pigeon-detail.component.html',
    styleUrls: ['./pigeon-detail.component.css']
})

export class PigeonDetailComponent implements OnInit { // Always export the component class because you'll always want to import it somewhere else
    @Input() pigeon: Pigeon;
    constructor (
        private pigeonService: PigeonService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit (): void {
        this.route.params
        // The switchMap operator maps the id in the Observable route parameters to a new 'Observable', the result of the getPigeon() method. If a user re-navigates to this component while a getPigeon request is still processing, switchMap cancels the old request and then calls pigeonService.getPigeon() again.
            .switchMap((params: Params) => this.pigeonService.getPigeon(+params['id'])) // Route params are always strings, so here the route parameter value is converted to a number with the JS (+) operator.
            .subscribe(pigeon => this.pigeon = pigeon);
    }

    save(): void {
        this.pigeonService.update(this.pigeon)
            .then(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}