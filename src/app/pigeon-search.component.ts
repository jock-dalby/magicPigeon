import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { PigeonSearchService } from './pigeon-search.service';
import { Pigeon } from './pigeon';

@Component({
    selector: 'pigeon-search',
    templateUrl: './pigeon-search.component.html',
    styleUrls: [ './pigeon-search.component.css' ],
    providers: [PigeonSearchService]
})
export class PigeonSearchComponent implements OnInit {

    pigeons: Observable<Pigeon[]>;

    private searchTerms = new Subject<string>();

    constructor(
        private pigeonSearchService: PigeonSearchService,
        private router: Router) {}

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.pigeons = this.searchTerms
        // Passing every user keystroke directly to the PigeonSearchService would create an excessive amount of HTTP requests, taxing
        // server resources and burning through the cellular network data plan. Instead, you can chain Observable operators that reduce the
        // request flow to the string Observable. You'll make fewer calls to the PigeonSearchService and still get timely results. Here's how:
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.pigeonSearchService.search(term)
                // or the observable of empty pigeons if there was no search term
                : Observable.of<Pigeon[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Pigeon[]>([]);
            });
    }
    gotoDetail(pigeon: Pigeon): void {
        let link = ['/detail', pigeon.id];
        this.router.navigate(link);
    }
}
