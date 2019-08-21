import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor( private authService: AuthService ) { }

  public login( forma: NgForm ) {

    const { email, password } = forma.value;
    this.authService.ingresar( email, password );
  }

  ngOnInit() {
  }

}
