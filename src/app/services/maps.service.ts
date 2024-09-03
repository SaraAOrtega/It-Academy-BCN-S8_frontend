import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import mapboxgl from 'mapbox-gl';
import { environment } from '../environments/environments';
import { Place } from '../intefaces/place';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: mapboxgl.Map | null = null;
  private http = inject(HttpClient);
  private placesSubject = new BehaviorSubject<Place[]>([]);
  places$ = this.placesSubject.asObservable();
  private markers: Map<number, mapboxgl.Marker> = new Map();

  constructor() {
    mapboxgl.accessToken = environment.mapboxKey;
    
  }

  buildMap() {
    if (!this.map) {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 12,
        center: [2.1734, 41.3851] // Barcelona
      });

      this.map.on('load', () => {
        this.loadAndDisplayPlaces();
      });
    }
  }

  private loadAndDisplayPlaces() {
    this.getPlaces().subscribe({
      next: (places) => {
        this.placesSubject.next(places);
        this.displayPlacesOnMap(places);
      },
      error: (error) => console.error('Error fetching places:', error)
    });
  }

  private getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${environment.endpoint}/api/places`).pipe(
      shareReplay(1)
    );
  }

  private displayPlacesOnMap(places: Place[]) {
    if (this.map) {
      places.forEach(place => {
        if (place.id_place !== undefined) {
          this.addMarker(
            parseFloat(place.longitud), 
            parseFloat(place.latitud), 
            place.title, 
            place.id_place
          );
        }
      });
    }
  }

  private addMarker(lng: number, lat: number, title: string, id: number) {
    if (this.map) {
      const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setHTML(title))
        .addTo(this.map);
        this.markers.set(id, marker);
    }
  }

  highlightMarker(placeId: number | undefined) {
    if (placeId !== undefined) {
      const marker = this.markers.get(placeId);
      if (marker) {
        const element = marker.getElement();
        // Toggle the highlight
        if (element.style.filter === 'hue-rotate(120deg) saturate(150%)') {
          element.style.filter = '';
        } else {
          element.style.filter = 'hue-rotate(120deg) saturate(150%)';
        }
      }
    }
  }
}
