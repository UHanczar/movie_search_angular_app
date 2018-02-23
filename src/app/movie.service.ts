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
  private baseConfiguration = 'https://api.themoviedb.org/3/configuration';
  private imageBaseUrl = '';
  private imageSizes: { backdrop?: string[], poster?: string[] } = {};
  constructor(private http: HttpClient) {
    this.setImageConfiguration();
  }

  get currentMovie() {
    return this.selectedMovie$;
  }

  searchMovie(query: string) {
    const params = new HttpParams().set('api_key', this.apiKey).set('query', query);
    return this.http.get<any>(this.baseUrl, { params }).map(res => res.results.map((result: Movie) => {
      return {
        ...result,
        backdropUrl: this.createPhotoUrl(result.backdrop_path, true),
        posterUrl: this.createPhotoUrl(result.poster_path, false)
      };
    }));
  }

  setImageConfiguration() {
    const params = new HttpParams().set('api_key', this.apiKey);
    this.http.get<any>(this.baseConfiguration, { params }).map(res => res)
      .subscribe(config => {
        this.imageBaseUrl = config.images.base_url;
        this.imageSizes = {
          backdrop: config.images.backdrop_sizes,
          poster: config.images.poster_sizes
        };
      });
  }

  createPhotoUrl(path: string, isBackdrop: boolean) {
    if (!path) {
      return '';
    }

    const { backdrop, poster } = this.imageSizes;
    const imageSize = isBackdrop ? backdrop[0] : poster[poster.length - 1] ;

    return `${this.imageBaseUrl}${imageSize}${path}`;
  }

  changeSelectedMovie(movie: Movie) {
    this.selectedMovie$.next(movie);
  }
}
