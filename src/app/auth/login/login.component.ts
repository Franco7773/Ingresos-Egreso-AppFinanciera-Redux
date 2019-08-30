import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  public cargando: boolean;
  private subscription: Subscription;

  constructor( private authService: AuthService,
               private store: Store<AppState> ) { }

  public login( forma: NgForm ) {

    const { email, password } = forma.value;
    this.authService.ingresar( email, password );
  }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
