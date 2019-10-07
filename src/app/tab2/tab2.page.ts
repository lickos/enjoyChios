import { Component, OnInit } from '@angular/core';
import { GeolocationService } from './../services/geolocation.service';
import { GetDataService } from './../services/get-data.service';
import { placesSearch, apiKey } from './../constants/constants';
import { StateManagerService } from './../services/state-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  coords: string = '';
  places: any;
  choices: boolean = true;
  list: boolean = false;
  urlForSearch: string;
  types: string[] = [];
  hospital: string;

  constructor(
    private geo: GeolocationService,
    private getData: GetDataService,
    public stateManager: StateManagerService,
    public route: Router
  ) { }

  ngOnInit() {
    this.geo.getLocation().then(resp => {
      this.coords = resp.coords.latitude.toString() +
        ',' + resp.coords.longitude.toString();
      this.stateManager.setuserCoords(this.coords);
    })
  }

  getPlaces() {
    if (this.types.length == 0) {
      this.urlForSearch = placesSearch + this.coords + '&radius=1500' + '&key=' + apiKey;
    } else {
      this.urlForSearch = placesSearch + this.coords + '&type=' + this.types.join(',') + '&rankby=distance' + '&key=' + apiKey;
    }
    console.log(this.urlForSearch);
    this.getData.getRemoteData(this.urlForSearch).then(data => {
      let places = data.data;
      let jsonPlaces = JSON.parse(places);
      this.places = jsonPlaces.results
      this.stateManager.setPlaces(this.places)
    }).then(() => {
      this.route.navigateByUrl('/tabs/tab2/places-list')
    })
  }

  typesSelect(types: string[]) {
    for (let type of types) {
      if (this.types.includes(type)) {
        this.types = this.types.filter(e => e !== type)
      } else {
        this.types.push(type)
      }
    }
  }
}
