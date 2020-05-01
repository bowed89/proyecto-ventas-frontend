import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../../services/venta.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-venta-index',
  templateUrl: './venta-index.component.html',
  styles: []
})
export class VentaIndexComponent implements OnInit {

  public ventas;
  public identity;

  constructor(
    private _ventaService: VentaService,
    private _userService: UserService,
    private router: Router
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {

    if (this.identity) {
      // cuando el usuario esta logueado
      this._ventaService.get_ventas().subscribe(
        response => {
          this.ventas = response.ventas;
        });
    } else {
      this.router.navigate(['']);

    }


  }

}
