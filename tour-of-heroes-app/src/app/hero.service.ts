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
    this.messageSvc.add('HeroesService: Fetched Heroes.');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(hero => hero.id === id)!;
    this.messageSvc.add(`HeroesService: Fethed Hero id=${id}`);
    return of(hero);    
  }
}
