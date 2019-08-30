import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import * as fromIE from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  private ingresoEgresoListenerSubscription: Subscription = new Subscription();
  private ingresoEgresoItemSubscription: Subscription = new Subscription();

  constructor( private afDB: AngularFirestore,
               private authService: AuthService,
               private store: Store<AppState> ) { }

  initIngresoEgresoListener() {

    this.ingresoEgresoListenerSubscription = this.store.select('auth').pipe(
      filter( auth => auth.user != null )).subscribe( auth => this.IngresoEgresoItems( auth.user.uid  ));
  }

  private IngresoEgresoItems( uid: string ) {
    this.ingresoEgresoItemSubscription = this.afDB.collection(`${ uid }/ingresos-egresos/items`).snapshotChanges()
    .pipe( map( docData => {
      return docData.map( doc => {
        return {
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
    }))
    .subscribe( (coleccion: any[]) => {
      this.store.dispatch( new fromIE.SetItemsAction(coleccion));
    });
  }

  cancelarSubscriptions() {
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.ingresoEgresoItemSubscription.unsubscribe();
    this.store.dispatch( new fromIE.UnsetItemsAction());
  }

  public crearIngresoEgreso( ingresoEgreso: IngresoEgresoModel ): Promise<any> {

    const user = this.authService.getUser();

    return this.afDB.doc<object>(`${ user.uid }/ingresos-egresos`).collection('items').add({ ...ingresoEgreso });
  }

  public borrarIngresoEgreso( uid: string ) {

    const user = this.authService.getUser();

    return this.afDB.doc(`${ user.uid }/ingresos-egresos/items/${ uid }`).delete();
  }
}
