import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  result: any;
  searchQuery: any;
  sub: any;
  constructor(private route: ActivatedRoute, private musicDataService: MusicDataService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((queryParams)=> 
    {
      this.searchQuery = queryParams;
      console.log(this.searchQuery);
      this.sub = this.musicDataService.searchArtists(this.searchQuery).subscribe(data=>
        {
          
          this.result = data.artists.items.filter(data=> data.images.length > 0);
          console.log(this.result);
        });
    });
   
    
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
    
}
