import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar'
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-album-component',
  templateUrl: './album-component.component.html',
  styleUrls: ['./album-component.component.css']
})
export class AlbumComponentComponent implements OnInit {
  album: any;
  id : Number;
  sub: any;
  constructor(private route: ActivatedRoute,private matSnackBar: MatSnackBar, private musicDataService: MusicDataService) { 
   
  }

  ngOnInit(): void {
    
    this.sub = this.route.params.subscribe((params)=>
    {
      this.id = params['id'] ; console.log(this.id);
      
    });
    this.musicDataService.getAlbumById(this.id).subscribe(data=>{this.album = data; console.log(this.album)});
  }


  addToFavourites(trackId)
  {
    this.musicDataService.addToFavorites(trackId).subscribe(
      (success)=>{
        this.matSnackBar.open("Adding to Favourites...", "Done", {duration:1500});
        console.log(success);
      },
      (err)=>{
        this.matSnackBar.open("Unable to add song to Favourites: ");
        console.log(err)
      }
    )
    {
     
    }
  }
  durationToMin(duration)
  {
    return (duration/60000).toFixed(2).toString();
  }

  dateConversion(inputDate)
  {
    let date = new Date(inputDate);
    let year= date.getFullYear().toString();
    return date.getMonth() +1 + '/' + (date.getDate() + 1) + '/' + year[2] + year[3];
  }
}
