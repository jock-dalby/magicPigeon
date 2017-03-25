import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Pigeon } from './pigeon';

@Injectable()

export class PigeonService {

    private pigeonsUrl = 'api/pigeons'; //URL to web api

    constructor(private http: Http) {}

    // The Angular http.get returns an RxJS Observable. Observables are a powerful way to manage asynchronous data flows. First we convert the Observable to a Promise using the toPromise operator. The Angular Observable doesn't have a toPromise operator out of the box. There are many operators like toPromise that extend Observable with useful capabilities. To use those capabilities, you have to add the operators themselves by importing them from the RxJS library as above.

    getPigeons(): Promise<Pigeon[]> { // ^^^ Notes ^^^
        return this.http.get(this.pigeonsUrl)
            .toPromise()
            .then(response => response.json().data as Pigeon[]) // In the Promise's then() callback, the json method of the HTTP Response extracts the data from within the response. The response JSON has a single data property, which holds the array of pigeons and returns it as the resolved Promise value.
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // Demo only
        return Promise.reject(error.message || error); // The code includes an error to the caller in a rejected promise, so that the caller can display a proper error message to the user.
    }

    getPigeon(id: number): Promise<Pigeon> {
        const url = `${this.pigeonsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Pigeon)
            .catch(this.handleError)
    }

    private headers = new Headers({'Content-Type': 'application/json'});

    update(pigeon: Pigeon): Promise<Pigeon> {
        const url = `${this.pigeonsUrl}/${pigeon.id}`;
        return this.http
            .put(url, JSON.stringify(pigeon), {headers: this.headers})
            .toPromise()
            .then(() => pigeon)
            .catch(this.handleError);
    }

    create( name: string): Promise<Pigeon> {
        return this.http.post(this.pigeonsUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Pigeon)
            .catch(this.handleError)
    }

    delete(id: number): Promise<void> {
        const url = `${this.pigeonsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
}

// mock.service setup

// getPigeons(): Promise<Pigeon[]> { // A promise-returning method with immediate effect
//     return Promise.resolve(PIGEONS);
// }
// getPigeonsSlowly(): Promise<Pigeon[]> { // Simulates a promise-returning method with a slow connection
//     return new Promise(resolve => {
//         setTimeout(() => resolve(this.getPigeons()), 5000);
//     });
// }
// getPigeon(id: number): Promise<Pigeon> {
//     return this.getPigeons()
//         .then(pigeons => pigeons.find(pigeon => pigeon.id === id));
// }

