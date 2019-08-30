import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  public cargando: boolean;
  private subscription: Subscription = new Subscription();

  constructor( private authService: AuthService,
               private store: Store<AppState> ) { }

  public userRegister( forma: NgForm ) {

    const { nombre, email, password } = forma.value;
    this.authService.crearUsuario( nombre, email, password );
  }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
