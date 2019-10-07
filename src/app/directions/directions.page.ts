import { Component, OnInit } from '@angular/core';
import { StateManagerService } from './../services/state-manager.service';
import { Directions, apiKey } from './../constants/constants';
import { GetDataService } from './../services/get-data.service';

declare var google;

@Component({
  selector: 'app-directions',
  templateUrl: './directions.page.html',
  styleUrls: ['./directions.page.scss'],
})
export class DirectionsPage implements OnInit {
  mode: string = 'DRIVING'

  constructor(
    public stateManager: StateManagerService,
    private getData: GetDataService
  ) { }

  ngOnInit() {
    this.initMap()
  }

  initMap() {
    let userCoords = this.stateManager.userCoords;
    let userCordsAr = userCoords.split(',');
    let latitude: number = +userCordsAr[0];
    let longitude: number = +userCordsAr[1];
    let destCoords = this.stateManager.directionCoords;
    let destCordsAr = destCoords.split(',');
    let latitudeDest: number = +destCordsAr[0];
    let longitudeDest: number = +destCordsAr[1];
    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer();
    let myPlace = new google.maps.LatLng(latitude, longitude);
    let destPlace = new google.maps.LatLng(latitudeDest, longitudeDest);
    let mapOptions = {
      zoom: 12,
      center: myPlace
    }
    let map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
    let start = myPlace;
    let end = destPlace;
    let request = {
      origin: start,
      destination: end,
      travelMode: this.mode
    };
    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(result)
      }
    })
  }

  changeMode(type: string) {
    this.mode = type;
    this.initMap();
  }
}
