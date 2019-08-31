import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
// import { AppState } from 'src/app/app.reducer';
import * as fromIE from '../ingreso-egreso.reducer';

import { IngresoEgresoModel } from '../ingreso-egreso.model';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  public ingresos: number = 0;
  public egresos: number = 0;

  public cuantosIngresos: number = 0;
  public cuantosEgresos: number = 0;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];

  protected subscription: Subscription = new Subscription();

  constructor( private store: Store<fromIE.AppState> ) { }

  ngOnInit() {
    this.subscription = this.store.select('ie').subscribe( ie => {
      this.contarIngresoEgreso( ie.items );
    });
  }

  contarIngresoEgreso( items: IngresoEgresoModel[] ) {

    items.forEach( item => {
      if (item.tipo === 'ingreso') {
        this.cuantosIngresos ++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos ++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [[ this.ingresos, this.egresos ]];
  }
}
