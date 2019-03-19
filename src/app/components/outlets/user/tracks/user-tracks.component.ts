import {
  Component,
  OnInit
} from '@angular/core';

import {GMapModule} from 'primeng/gmap';

declare var google: any;

@Component({
  selector: 'app-user-tracks',
  templateUrl: './user-tracks.component.html',
  styleUrls: ['./user-tracks.component.scss']
})
export class UserTracksComponent implements OnInit {

      options: any;
      overlays: any[];

      constructor() {}


    ngOnInit() {
        this.options = {
            center: {lat: -37.325884, lng: -59.147160},
            zoom: 15
        };

        this.overlays = [
            new google.maps.Polyline({
                path: [{lat: -37.325884, lng: -59.147160}, {lat: -37.325364, lng: -59.145791}],
                geodesic: true, strokeColor: '#00ff00', strokeOpacity: 1, strokeWeight: 5
            })
        ];
    }

}
