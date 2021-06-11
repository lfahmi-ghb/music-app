import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  
  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient, private auth: AuthService) { }  

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }
  getArtistById(id): Observable<SpotifyApi.SingleArtistResponse>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` }})
      }));
    

  }
  getAlbumsByArtistId(id): Observable<SpotifyApi.ArtistsAlbumsResponse>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`, { headers: { "Authorization": `Bearer ${token}` }})
      }));
    
  }

  getAlbumById(id): Observable<SpotifyApi.SingleAlbumResponse>
  {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
    return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` }})
    }));
  }
  searchArtists(searchString) : Observable<SpotifyApi.ArtistSearchResponse>
  {
    
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/search?q=${searchString.q}&type=artist&limit=50`, { headers: { "Authorization": `Bearer ${token}` }})
      }));
   

  }
  addToFavorites(id): Observable<[String]>{
   
      
      return this.http.put<any>(`${environment.userAPIBase}/favourites/${id}`, {"user": this.auth.getToken()});
    
  }
  removeFromFavorites(id): Observable<any>
  {
    return this.http.delete<any>(`${environment.userAPIBase}/favourites/${id}`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      let arr;
      if(favouritesArray.data.length >= 1)
      {
         arr = favouritesArray.data.slice(1);
         return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>
          {
            return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favouritesArray.data.join()}`, {headers:{"Authorization": `Bearer ${token}`}})
          }))
      }else{
       arr = favouritesArray.data;
       return  new Observable(o=>o.next({tracks: []}));;
      }
     
     
        // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
        // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
       
     
    }));
  }
  getFavorites(): Observable<any>
  {
    return this.http.get<any>(`${environment.userAPIBase}/favourites/`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      
      if( favouritesArray.data.length >= 1)
      {
        console.log(favouritesArray.data);
        
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>
          {
            return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favouritesArray.data.join()}`, {headers:{"Authorization": `Bearer ${token}`}})
          }))
        
      }else{
        return new Observable(o=>o.next({tracks: []}));
      }
    }));
    }
  
}