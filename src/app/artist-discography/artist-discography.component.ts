import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService} from '../music-data.service'
@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  public albums: any; 
  public artist: any;
  public id: Number;
  public sub: any;
  constructor(private route: ActivatedRoute, private musicData: MusicDataService) { }

  ngOnInit(): void {
    
    this.sub = this.route.params.subscribe(params=>{(this.id) = params['id']; console.log(this.id);
    this.musicData.getArtistById(this.id).subscribe((data) => {this.artist = data; console.log(this.artist)});
    this.musicData.getAlbumsByArtistId(this.id).subscribe((data)=> {this.albums = [...new Set(data.items)]; console.log(this.albums)});
  });
    
  }
  
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
