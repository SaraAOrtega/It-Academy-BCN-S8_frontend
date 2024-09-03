import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWFvcnRlZ2ExMCIsImEiOiJjbTBsM3MwN2YwMWl6MnJzM3VtcXlhbGM3In0.nW3PRFIM43i44CGL-3_yEw';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));