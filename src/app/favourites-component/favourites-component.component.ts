import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MusicDataService} from '../music-data.service'
@Component({
  selector: 'app-favourites-component',
  templateUrl: './favourites-component.component.html',
  styleUrls: ['./favourites-component.component.css']
})
export class FavouritesComponentComponent implements OnInit {
  favourites: Array<any>;
  sub: any;
  constructor(private musicDataService: MusicDataService) { }

  ngOnInit(): void {
    this.sub = this.musicDataService.getFavorites().subscribe(data => {this.favourites = data.tracks; console.log(data)});
  }

  removeFromFavourites(id)
  {
    this.musicDataService.removeFromFavorites(id).subscribe(data=> this.favourites = data.tracks);
  }
  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  durationToMin(duration)
  {
    return (duration/60000).toFixed(2).toString();
  }
}
