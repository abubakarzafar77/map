import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MapsAPILoader } from '@agm/core'
import { } from 'googlemaps';

import { MarkerService } from './services/marker.service';






@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MarkerService]
})
export class AppComponent implements OnInit {

    //search map form code
    public latitude: number;
    public longitude: number;
    // public searchControl: FormControl;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef: ElementRef;
    constructor(
        private _markerServices: MarkerService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {
        this.markers = _markerServices.getMarkers();
    }
    ngOnInit() {
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        // this.searchControl = new FormControl;

        //set current position
        this.setCurrentPosition();


        //load Places AutoComplete
        this.mapsAPILoader.load()
            .then(() => {
                let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                    types: ['address']
                });
                autocomplete.addListener("place_changed", () => {
                    this.ngZone.run(() => {
                        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                        // console.log(place);
                        // console.log(place.formatted_address);
                        // console.log(place.geometry);
                        // console.log(place.geometry.location.lat());
                        //verify result
                        if (place.geometry === undefined || place.geometry === null) {
                            return;
                        }

                        //set latitude, longitude and zoom
                        this.latitude = place.geometry.location.lat();
                        this.longitude = place.geometry.location.lng();
                        this.zoom = 12;
                    })

                })
            })
    }







    title = 'My first AGM project';
    lat: number;
    lng: number;
    z: number = 10;

    markerName: string;
    markerLat: string;
    markerLng: string;
    markerDraggable: string;

    markers: marker[];

    // isDraggable: boolean;





    clickedMarker(marker: marker, index: number) {
        console.log('markerClick: ' + marker.name + ' at index ' + index);
    }

    mapClicked($event: any) {
        console.log("mapClick");
        console.log($event.coords.lat);
        console.log($event.coords.lng);
        var newMarker = {
            name: 'Untitled',
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: false
        }
        this._markerServices.addMarker(newMarker);
        this.markers = this._markerServices.getMarkers();
    }
    deleteMarker(marker: any) {
        this._markerServices.deleteMarker(marker);
        this.markers = this._markerServices.getMarkers();
    }
    markerDragEnd(marker: any, $event: any) {
        console.log('dragEnd');
        var oldMarker = {
            name: marker.name,
            lat: parseFloat(marker.lat),
            lng: parseFloat(marker.lng),
            draggable: false
        }
        var newLat = $event.coords.lat;
        var newLng = $event.coords.lng;
        this._markerServices.updateMarker(oldMarker, newLat, newLng);
        // console.log(newLat);
        // console.log(newLng);
    }
    addMarker() {
        console.log("addMarker");

        if (this.markerDraggable == 'yes') {
            var isDraggable = true;
        } else {
            var isDraggable = false;
        }

        var newMarker = {
            name: this.markerName,
            lat: parseFloat(this.markerLat),
            lng: parseFloat(this.markerLng),
            draggable: isDraggable
        }
        this._markerServices.addMarker(newMarker);
        this.markers = this._markerServices.getMarkers();
    }


    // getUserLocation() {
    //     /// locate the user
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(position => {
    //             this.lat = position.coords.latitude;
    //             this.lng = position.coords.longitude;
    //             // console.log(this.lat);
    //         });

    //     }
    // }
    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }
}


interface marker {
    name?: string,
    lat: number,
    lng: number,
    draggable: boolean
}