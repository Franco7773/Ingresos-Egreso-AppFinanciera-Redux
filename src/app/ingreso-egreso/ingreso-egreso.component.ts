import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as fromIE from '../ingreso-egreso/ingreso-egreso.reducer';

import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  public forma: FormGroup;
  public tipo: string = 'ingreso';

  protected loadingSubs: Subscription = new Subscription();
  public cargando: boolean;

  constructor( private IEService: IngresoEgresoService,
               private store: Store<fromIE.AppState> ) { }

  ngOnInit() {
    this.loadingSubs = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading );

    this.forma = new FormGroup({
      descripcion: new FormControl( '', [Validators.required, Validators.minLength(7)]),
      monto: new FormControl( 0, [Validators.required, Validators.min(0)])
    });
  }

  public crearIngresoEgreso() {

    this.store.dispatch( new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgresoModel({ ...this.forma.value, tipo: this.tipo });

    this.IEService.crearIngresoEgreso( ingresoEgreso ).then( () => {

      this.store.dispatch( new DesactivarLoadingAction());

      this.forma.reset({
        monto: 0
      });

      Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }
}
