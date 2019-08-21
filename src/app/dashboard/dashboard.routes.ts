import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { AuthGuard } from '../auth/auth.guard';

const routesChildren: Routes = [
  { path: '', component: DashboardComponent, canActivate: [ AuthGuard ], children: [
    { path: 'estadisticas', component: EstadisticaComponent },
    { path: 'ingresos-egresos', component: IngresoEgresoComponent },
    { path: 'detalle', component: DetalleComponent },
    { path: '', pathMatch: 'full', redirectTo: 'estadisticas' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild( routesChildren )],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
