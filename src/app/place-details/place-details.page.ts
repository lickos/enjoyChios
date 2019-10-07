import { Component, OnInit } from '@angular/core';
import { StateManagerService } from './../services/state-manager.service';
import { Photo, apiKey, Distance } from './../constants/constants';
import { Router } from '@angular/router';
import { GetDataService } from './../services/get-data.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {
  details: any;
  picUrl: string;
  wholeStars: number;
  decStars: number;
  emptyStars: number;
  starsArray: string[] = [];
  distance: string;

  constructor(
    private stateManager: StateManagerService,
    private router: Router,
    private getData: GetDataService
  ) { }

  ngOnInit() {
    this.details = this.stateManager.details;
    let dirCoords: string = this.details.geometry.location.lat + ',' + this.details.geometry.location.lng;
    this.stateManager.setDirectionCoords(dirCoords);
    let myPlace = this.stateManager.userCoords
    let urlForDist = Distance + '&origins=' + myPlace + '&destinations=' + dirCoords + '&key=' + apiKey;
    this.getData.getRemoteData(urlForDist).then(data => {
      let distance = data.data;
      let distanceJson = JSON.parse(distance);
      this.distance = distanceJson.rows[0].elements[0];
      console.log(this.distance)
    })
    console.log(dirCoords)
    if (this.details.photos.length == 0) {
      console.log(this.details.photos.length)
    } else {
      let length = this.details.photos.length;
      let pic = Math.floor(Math.random() * length);
      let reference = this.details.photos[pic].photo_reference;
      let url = Photo + reference + '&key=' + apiKey;
      this.picUrl = url
    }
    let rating = this.details.rating;
    let roundedRating = Math.round(rating * 2) / 2;
    this.wholeStars = Math.floor(roundedRating);
    if (roundedRating > this.wholeStars) {
      this.decStars = 1;
      this.emptyStars = 5 - (this.wholeStars + this.decStars)
    } else {
      this.decStars = 0;
      this.emptyStars = 5 - this.wholeStars
    }
    for (let i = 0; i < this.wholeStars; i++) {
      this.starsArray.push("w")
    }
    for (let d = 0; d < this.decStars; d++) {
      this.starsArray.push('d')
    }
    for (let e = 0; e < this.emptyStars; e++) {
      this.starsArray.push("e")
    }
  }

  goToDirections() {
    this.router.navigate(['/tabs/tab2/directions']);
  }

}
