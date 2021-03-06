import { Routes } from '@angular/router';

import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';

export const routesChildren: Routes = [
  { path: 'estadisticas', component: EstadisticaComponent },
  { path: 'ingresos-egresos', component: IngresoEgresoComponent },
  { path: 'detalle', component: DetalleComponent },
  { path: '', pathMatch: 'full', redirectTo: 'estadisticas' }
];
