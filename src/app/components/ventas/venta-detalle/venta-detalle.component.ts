import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from '../../../services/venta.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styles: []
})
export class VentaDetalleComponent implements OnInit {

  public id;
  public venta: any = {
    iduser: '',
    idcliente: ''
  };
  public detalles;
  public identity = this._userService.getIdentity();

  constructor(
    private route: ActivatedRoute,
    private _route: Router,
    private _ventaService: VentaService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {

    if (this.identity) {
      this.route.params.subscribe(
        params => {
          this.id = params['id'];
        }
      );
  
      this._ventaService.data_venta(this.id).subscribe(
        response => {
          console.log('sdsds', response)
          this.venta = response.data.venta;
          this.detalles = response.data.detalles;
        }
      );
    } else {
      this._route.navigate(['']);
    }

  }

}
