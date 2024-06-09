import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { News } from './models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  getNews(): Observable<News[]> {
    return of([
      new News('News 1', 'There are European Parliament voting taking place in Romania and also city voting, bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla...', 'https://www.hotnews.ro/stiri-esential-27196675-unde-votez-sectie-votare-alegeri-9-iunie-alegeri-locale-europarlamentare.htm', ['tag1', 'tag2', 'tag3']),
      new News('News 2', 'Excerpt 2', 'Source 2', ['tag3', 'tag4']),
      new News('News 3', 'Excerpt 3', 'Source 3', ['tag5', 'tag6'])
    ]);
  }

  // getNews() : News[] 
}
