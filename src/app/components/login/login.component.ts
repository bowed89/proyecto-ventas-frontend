import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public token;
  public identity = this._userService.getIdentity();
  public user = new User('', '', '', '', '');
  public data_error;

  constructor(
    private _userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.identity) {
      this.router.navigate(['ventas']);
    }
  }
  close_message() {
    this.data_error = '';
  }

  login(loginForm) {

    if (loginForm.valid) {
      // Se almacena el token del user en el locaStorage
      this._userService.login(this.user).subscribe(
        response => {
          this.token = response.jwt;
          localStorage.setItem('token', this.token);

          // Se almacena los datos del user en el locaStorage
          this._userService.login(this.user, true).subscribe(
            response => {
              localStorage.setItem('identity', JSON.stringify(response.user));
              this.router.navigate(['ventas']);

            },
            error => {}
          );
        },
        error => {
          // message del error de pass no coincide o correo no existe
          this.data_error = error.error.message;
        }
      );
    }
  }

}
