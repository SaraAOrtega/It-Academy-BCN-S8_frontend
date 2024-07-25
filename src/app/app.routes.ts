import { Routes } from '@angular/router';
import { CrudComponent } from './components/crud/crud.component';
import { AddEditListComponent } from './components/add-edit-list/add-edit-list.component';

export const routes: Routes = [
    { path: '', component: CrudComponent},
    { path: 'add', component: AddEditListComponent},
    { path: 'edit/:id', component: AddEditListComponent},
    { path: '**', redirectTo: '', pathMatch: 'full',}
];
