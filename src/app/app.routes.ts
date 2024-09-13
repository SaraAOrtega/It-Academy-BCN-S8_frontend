import { Routes } from '@angular/router';
import { CrudComponent } from './components/crud/crud.component';
import { AddEditListComponent } from './components/add-edit-list/add-edit-list.component';
import { MapComponent } from './components/map/map.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { GraphicsComponent } from './components/graphics/graphics.component';

export const routes: Routes = [
    { path: '', component: CrudComponent},
    { path: 'add', component: AddEditListComponent},
    { path: 'edit/:id', component: AddEditListComponent},
    { path: 'map', component: MapComponent},
    { path: 'calendar', component: CalendarComponent},
    { path: 'graphics', component: GraphicsComponent},
    { path: '**', redirectTo: '', pathMatch: 'full',},
];
