import { Component, OnInit, Input } from '@angular/core';
import { Movie } from './Movie';

@Component({
  selector: 'display-movie',
  templateUrl: './display-movie.component.html',
  styleUrls: ['./display-movie.component.css']
})
export class DisplayMovieComponent implements OnInit {
  @Input() movie:Movie;
  constructor() { }

  ngOnInit() {
  }

  private getPosterUrl(path: string) {
    return 'http://a.dilcdn.com/bl/wp-content/uploads/sites/8/2013/02/toy_story_wallpaper_by_artifypics-d5gss19.jpg';
  }
}
