import { Component, OnInit } from '@angular/core';

import { Hero } from '../interfaces/hero'
import { HEROES } from '../assets/mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = HEROES;
  selectedHero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(hero: Hero){
    this.selectedHero = hero;
  }

}
