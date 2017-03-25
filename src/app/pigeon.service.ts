import { Injectable } from '@angular/core';

import { Pigeon } from './pigeon';
import { PIGEONS } from './mock-pigeons';

@Injectable()

export class PigeonService {
    getPigeons(): Promise<Pigeon[]> { // A promise-returning method with immediate effect
        return Promise.resolve(PIGEONS);
    }
    getPigeonsSlowly(): Promise<Pigeon[]> { // Simulates a promise-returning method with a slow connection
        return new Promise(resolve => {
            setTimeout(() => resolve(this.getPigeons()), 5000);
        });
    }
    getPigeon(id: number): Promise<Pigeon> {
        return this.getPigeons()
            .then(pigeons => pigeons.find(pigeon => pigeon.id === id));
    }
}

