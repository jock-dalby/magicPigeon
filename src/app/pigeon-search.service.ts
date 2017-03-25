import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Pigeon } from './pigeon';

@Injectable()


export class PigeonSearchService {
    constructor(private http: Http) {}

    search(term: string): Observable<Pigeon[]> {
        return this.http
            .get(`app/pigeons/?name=${term}`)
            .map(response => response.json().data as Pigeon[]);
    }
}