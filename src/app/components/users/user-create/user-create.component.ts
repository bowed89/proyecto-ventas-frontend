import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public user = new User('', '', '', '', '');
  public success_message;
  public error_message;
  public identity;


  constructor(
    private _userServices: UserService,
    private _router: Router

  ) {
        this.identity = this._userServices.getIdentity();
   }

  ngOnInit(): void {
        // Sino es admin redirecciona al dashboard ...
        if (!(this.identity.role === 'ADMIN')) {
          this._router.navigate(['/dashboard']);
        }
  }

  success_alert() {
    this.success_message = '';
  }
  error_alert() {
    this.error_message = '';
  }

  onSubmit(userForm) {
    if (userForm.valid) {
      this._userServices.registrar({
        email: userForm.value.email,
        nombres: userForm.value.nombres,
        password: userForm.value.password,
        role: userForm.value.role,
      }).subscribe(
        response => {
          this.user = new User('', '', '', '', '');
          this.success_message = 'El usuario se registro con éxito';
        }, error => {
          console.log(error);
        }
      );
    } else {
      this.error_message = 'No se pudo registrar el usuario';
    }

  }

}
