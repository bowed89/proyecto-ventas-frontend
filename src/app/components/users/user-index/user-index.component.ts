import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../../services/global';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  public url = GLOBAL.url;
  public usuarios;
  public p: number = 1;
  public collection: any[];
  public identity;

  constructor(
    private _userService: UserService,
    private router: Router
  ) { 
    this.identity = _userService.getIdentity();
  }

  ngOnInit(): void {
    // Sino es admin redirecciona al dashboard ...
    if (this.identity.role === 'ADMIN') {
      this._userService.get_users().subscribe(
        response => {
          this.usuarios = response.usuarios;
        }
      );
    } else {
      this.router.navigate(['/dashboard']);

    }

  }

}
