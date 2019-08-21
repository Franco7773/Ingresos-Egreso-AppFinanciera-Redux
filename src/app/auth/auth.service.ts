import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth,
               private afDB: AngularFirestore,
               private router: Router ) { }

  initAuthListener() {

    this.afAuth.authState.subscribe( (fireUser: firebase.User) => {

      console.log(fireUser);
    });
  }

  public crearUsuario( nombre: string, email: string, password: string ) {

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then( resp => {

      const user: User = {
        nombre,
        email: resp.user.email,
        uid: resp.user.uid
      };
      this.afDB.doc(`${ user.uid }/usuario`).set( user ).then( () => {

        this.router.navigate(['/']);
      });
    }).catch( err => {
      console.error( err );

      Swal.fire('Error en el registro', err.message, 'error');
    });
  }

  public ingresar( email: string, password: string ) {

    this.afAuth.auth.signInWithEmailAndPassword( email, password ).then( resp => {

      this.router.navigate(['/']);
    }).catch( err => {
      console.error( err );

      Swal.fire('Error en el login', err.message, 'error');
    });
  }

  public logout() {

    this.router.navigate(['/login']);

    this.afAuth.auth.signOut();
  }

  public isAuth() {
    return this.afAuth.authState.pipe( map( fireUser => {

      if (fireUser == null) {
        this.router.navigate(['/login']);
      }

      return fireUser != null;
    }));
  }
}
