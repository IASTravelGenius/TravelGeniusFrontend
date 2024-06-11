import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { News } from './models/news';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GlobalsService } from './globals.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient, private globalsService: GlobalsService) { }

  getNews(): Observable<News[]> {
    const urlBackend = environment.backendUrl + "/news";
    const headers_dict = {
      'Authorization': 'Bearer ' + this.globalsService.getAccessToken(),
    };
    const options = {
      headers: headers_dict,
      observe: 'response' as 'response', // Correct usage for the observe option
    };

    return this.http.get<News[]>(urlBackend, options).pipe(
      map(response => {
        console.log('News response:', response);
        return response.body as News[];
      })
    );

    // return of([]);
    // return of([
    //   new News('News 1', 'There are European Parliament voting taking place in Romania and also city voting, bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla...', 'https://www.hotnews.ro/stiri-esential-27196675-unde-votez-sectie-votare-alegeri-9-iunie-alegeri-locale-europarlamentare.htm', ['tag1', 'tag2', 'tag3']),
    //   new News('News 2', 'Excerpt 2', 'Source 2', ['tag3', 'tag4']),
    //   new News('News 3', 'Excerpt 3', 'Source 3', ['tag5', 'tag6'])
    // ]);
  }

  // getNews() : News[] 
}
