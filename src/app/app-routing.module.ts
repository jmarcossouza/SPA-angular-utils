import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormulariosComponent } from './pages/formularios/formularios.component';


const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "forms", component: FormulariosComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
