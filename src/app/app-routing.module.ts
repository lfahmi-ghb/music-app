import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from './about/about.component'
import {NewReleasesComponent} from './new-releases/new-releases.component'
import {ArtistDiscographyComponent} from './artist-discography/artist-discography.component'
import {AlbumComponentComponent} from './album-component/album-component.component' 
import {NotFoundComponent} from './not-found/not-found.component'
import {SearchResultsComponent} from './search-results/search-results.component'
import {FavouritesComponentComponent} from './favourites-component/favourites-component.component'
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GuardAuthService } from './guard-auth.service';
const routes: Routes = [
  
    {path:'', redirectTo: '/newReleases', pathMatch: 'full'},
{path: 'newReleases', component: NewReleasesComponent, canActivate: [GuardAuthService]},
{path: 'artist/:id', component: ArtistDiscographyComponent, canActivate: [GuardAuthService]},
{path: 'album/:id', component: AlbumComponentComponent, canActivate: [GuardAuthService]},
{path: 'about', component: AboutComponent, canActivate: [GuardAuthService]},
{path: "search", component: SearchResultsComponent, canActivate: [GuardAuthService]},
{path: 'favourites', component: FavouritesComponentComponent, canActivate: [GuardAuthService]},
{path:'register', component: RegisterComponent},
{path:'login', component: LoginComponent},
{path: '**', component: NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
