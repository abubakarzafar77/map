import { Injectable } from '@angular/core';
import { Init } from './init-markers';

@Injectable()
export class MarkerService extends Init {
    constructor() {
        super();
        console.log('Marker Service Installed...');
        this.load();
    }

    getMarkers() {
        var markers = JSON.parse(localStorage.getItem('markers'));
        return markers;
    }

    addMarker(newMarker) {
        var markers = JSON.parse(localStorage.getItem('markers'));

        //push to array
        markers.push(newMarker);
        // Set is markers again

        localStorage.setItem('markers', JSON.stringify(markers));
    }

    updateMarker(marker, newLat, newLng) {
        var markers = JSON.parse(localStorage.getItem('markers'));

        for (var i = 0; i < markers.length; i++) {
            if (markers[i].lat == marker.lat && markers[i].lng == marker.lng) {
                markers[i].lat = newLat;
                markers[i].lng = newLng;
            }
        }

        localStorage.setItem('markers', JSON.stringify(markers));
    }
    deleteMarker(marker) {
        var markers = JSON.parse(localStorage.getItem('markers'));

        for (var i = 0; i < markers.length; i++) {
            if (markers[i].lat == marker.lat && markers[i].lng == marker.lng) {
                markers.splice(i, 1);
            }
        }
        localStorage.setItem('markers', JSON.stringify(markers));
    }
}