import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public id;
  public user = new User('', '', '', '', '');
  public password;
  public error_message;
  public success_message;
  public identity;

  constructor(
    private route: ActivatedRoute,
    private _userService: UserService,
    private _router: Router
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    // Sino es admin redirecciona al dashboard ...
    if (this.identity.role === 'ADMIN') {
      this.route.params.subscribe(
        params => {
          this.id = params['id'];
          console.log(this.id);
        }
      );
      this._userService.get_user(this.id).subscribe(
        response => {
          this.user = response.user;
        }
      );
    } else {
      this._router.navigate(['/dashboard']);

    }


  }

  error_alert() {
    this.error_message = '';
  }
  success_alert() {
    this.success_message = '';
  }

  onSubmit(userForm) {
    if (userForm.valid) {
      this._userService.editar({
        _id: this.id,
        nombres: userForm.value.nombres,
        email: userForm.value.email,
        password: userForm.value.password,
        role: userForm.value.role
      }).subscribe(
        response => {
          this.success_message = 'Se actualizo los datos del usuario';
          console.log(response);
        }, error => {

        }
      );
    } else {
      this.error_message = 'No se pudo actualizar los datos del usuario';
    }

  }

}
