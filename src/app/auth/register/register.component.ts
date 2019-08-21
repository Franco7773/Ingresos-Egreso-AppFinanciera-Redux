import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor( private authService: AuthService ) { }

  public userRegister( forma: NgForm ) {

    const { nombre, email, password } = forma.value;
    this.authService.crearUsuario( nombre, email, password );
  }

  ngOnInit() {
  }

}
