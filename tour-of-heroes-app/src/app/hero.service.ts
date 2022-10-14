import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './interfaces/hero';
import { HEROES } from './assets/mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messageSvc: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageSvc.add('HeroesService: fetched heroes.');
    return heroes;
  }
}
