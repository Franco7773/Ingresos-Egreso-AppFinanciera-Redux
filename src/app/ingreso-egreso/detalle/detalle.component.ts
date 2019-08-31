import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgresoModel } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import * as fromIE from '../ingreso-egreso.reducer';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  public items: IngresoEgresoModel[];
  private subscription: Subscription = new Subscription();

  constructor( private store: Store<fromIE.AppState>, private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {
    this.subscription = this.store.select('ie').subscribe( ingresoEgreso => {
      this.items = ingresoEgreso.items;
    });
  }

  public borrarItem( item: IngresoEgresoModel ) {

    this.ingresoEgresoService.borrarIngresoEgreso( item.uid ).then( () =>
      Swal.fire('Eliminado exitosamente', item.descripcion, 'success'));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
