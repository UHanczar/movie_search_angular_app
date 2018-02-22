import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Movie } from './Movie';

@Injectable()
export class MovieService {
  private selectedMovie$: Subject<Movie> = new Subject<Movie>();
  private apiKey = '0e591c33fbc1ba6715d1622d2ef3630e';
  private baseUrl = 'https://api.themoviedb.org/3/search/movie';
  constructor(private http: HttpClient) { }

  get currentMovie() {
    return this.selectedMovie$;
  }

  searchMovie(query: string) {
    const params = new HttpParams().set('api_key', this.apiKey).set('query', query);
    return this.http.get<any>(this.baseUrl, { params }).map(res => res.results);
  }

  changeSelectedMovie(movie: Movie) {
    this.selectedMovie$.next(movie);
  }
}
