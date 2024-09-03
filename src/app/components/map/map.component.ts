import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '../../services/maps.service';
import { Place } from '../../intefaces/place'; // Asegúrate de importar la interfaz Place

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(public mapService: MapService) { }

  ngOnInit() {
    this.mapService.buildMap();
  }

  highlightMarker(place: Place) {
    if (place.id_place !== undefined) {
      this.mapService.highlightMarker(place.id_place);
    }
  }
  trackByPlaceId(place: Place): number | undefined {
    return place.id_place;
  }
}
