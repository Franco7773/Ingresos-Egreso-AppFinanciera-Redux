import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
// import { AuthGuard } from '../auth/auth.guard';
import { routesChildren } from './dashboard.routes';


const routes: Routes = [
  { path: '', component: DashboardComponent, /*canActivate: [ AuthGuard ],*/ children: routesChildren },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
