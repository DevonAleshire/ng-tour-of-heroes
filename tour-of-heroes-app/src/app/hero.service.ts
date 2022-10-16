import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './interfaces/hero';
import { HEROES } from './assets/mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl: string = '/api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private messageSvc: MessageService, private http: HttpClient) {}

  private log(message: string) {
    this.messageSvc.add(`Hero Service: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    const heroes = this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('Fetched Heroes.')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    // const hero = HEROES.find((hero) => hero.id === id)!;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`Fetched Hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /////////// Save Methods //////////
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`Updated Hero Name: ${hero.name} | id: ${hero.id}`)),
      catchError(this.handleError<any>('UpdateHero'))
    );
  }

  addHero(hero: Hero){
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Added here w/ id:${newHero.id}`)),
      catchError(this.handleError<Hero>('add Hero'))
    )
  }
}
