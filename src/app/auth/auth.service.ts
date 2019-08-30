import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

import { User } from './user.model';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as fromUI from '../shared/ui.actions';
import * as fromAuth from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private usuario: User;

  constructor( private afAuth: AngularFireAuth,
               private afDB: AngularFirestore,
               private store: Store<AppState>,
               private router: Router ) { }

  initAuthListener(): void {

    this.afAuth.authState.subscribe( (fireUser: firebase.User) => {

      if (fireUser) {

        this.userSubscription = this.afDB.doc(`${ fireUser.uid }/usuario`).valueChanges().subscribe( (userObj: User) => {

          this.store.dispatch( new fromAuth.SetUserAction( new User( userObj ) ));
          this.usuario = userObj;
        });
      } else {
        this.userSubscription.unsubscribe();
        this.usuario = null;
      }

    });
  }

  public crearUsuario( nombre: string, email: string, password: string ): Promise<void> {

    this.store.dispatch( new fromUI.ActivarLoadingAction());

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then( resp => {

      const user: User = {
        nombre,
        email: resp.user.email,
        uid: resp.user.uid
      };
      this.afDB.doc(`${ user.uid }/usuario`).set( user ).then( () => {

        this.router.navigate(['/']);

        this.store.dispatch( new fromUI.DesactivarLoadingAction());
      });
    }).catch( err => {
      console.error( err );
      this.store.dispatch( new fromUI.DesactivarLoadingAction());
      Swal.fire('Error en el registro', err.message, 'error');
    });
  }

  public ingresar( email: string, password: string ): void {

    this.store.dispatch( new fromUI.ActivarLoadingAction() );

    this.afAuth.auth.signInWithEmailAndPassword( email, password ).then( resp => {

      this.router.navigate(['/']);

      this.store.dispatch( new fromUI.DesactivarLoadingAction() );
    }).catch( err => {
      console.error( err );
      this.store.dispatch( new fromUI.DesactivarLoadingAction() );
      Swal.fire('Error en el login', err.message, 'error');
    });
  }

  public logout(): void {

    this.router.navigate(['/login']);
    this.store.dispatch( new fromAuth.UnsetUserAction());
    this.afAuth.auth.signOut();
  }

  public isAuth(): Observable<boolean> {
    return this.afAuth.authState.pipe( map( fireUser => {

      if (fireUser == null) {
        this.router.navigate(['/login']);
      }

      return fireUser != null;
    }));
  }

  public getUser() {
    return { ...this.usuario };
  }
}
