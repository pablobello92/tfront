import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {
    GMapModule
} from 'primeng/gmap';

import {
    MapOptions
} from '../../../../../shared/interfaces/City';
import { Coordinate } from '../../../../../shared/interfaces/Coordinate';



declare var google: any;

@Component({
    selector: 'app-reparations',
    templateUrl: './reparations.component.html',
    styleUrls: ['./reparations.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ReparationsComponent implements OnInit {

    private map: google.maps.Map;
    overlays: any[] = [];
    atLeastTwoLocationsSelected: boolean = false;

    constructor() {}

    ngOnInit() {}

    setMap($event): void {
        this.map = $event.map;
        const options: MapOptions = {
            'center': {
                "lat": -37.3195177,
                "lng": -59.1777215
            },
            'zoom': 13
        };
        this.map.setOptions(options);
    }

    public handleMapClick($event): void {
        const coords: Coordinate = {
            lat: $event.latLng.lat(),
            lng: $event.latLng.lng()
        };
        const newMarker = new google.maps.Marker({position: coords, title:'Desde'});
        this.overlays.push(newMarker);
    }

    public postNewReparation(): void {
        alert('reparation posted!');
    }

}
