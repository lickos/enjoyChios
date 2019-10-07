import { Component, OnInit } from '@angular/core';
import { StateManagerService } from './../services/state-manager.service';
import { Details, apiKey } from './../constants/constants';
import { GetDataService } from './../services/get-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.page.html',
  styleUrls: ['./places-list.page.scss'],
})
export class PlacesListPage implements OnInit {
  placesList: any;
  details: any;

  constructor(
    private stateManager: StateManagerService,
    private getData: GetDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.placesList = this.stateManager.places
  }

  openDetails(place: any) {
    let url = Details + place.place_id + '&key=' + apiKey;
    this.getData.getRemoteData(url).then(data => {
      let details = data.data
      let detailsJson = JSON.parse(details)
      this.details = detailsJson.result;
      this.stateManager.setDetails(this.details);
      this.router.navigate(['/tabs/tab2/place-details']);
    })
  }

}
