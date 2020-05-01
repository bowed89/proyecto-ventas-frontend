import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ClienteService } from '../../../services/cliente.service';
import { ProductoService } from '../../../services/producto.service';
import { Router } from '@angular/router';
import { DetalleVenta } from '../../../models/DetalleVenta';
import { Venta } from '../../../models/Venta';
import { VentaService } from '../../../services/venta.service';

@Component({
  selector: 'app-venta-create',
  templateUrl: './venta-create.component.html',
  styleUrls: ['./venta-create.component.css']
})
export class VentaCreateComponent implements OnInit {
  public error_message;
  public identity;
  public venta: any = {idcliente: ''};
  public clientes: any;
  public productos;
  public producto: any = {
    stock: '--|--'
  };
  public data_detalle: Array<any> = [];
  // se almacena el idproducto del select y la cantidad
  public detalle: any = {
    idproducto: ''
  };
  public total = 0;
  public detalleVenta = new DetalleVenta('', '', 0);

  constructor(
    private _userService: UserService,
    private _clienteService: ClienteService,
    private _productoService: ProductoService,
    private _ventaService: VentaService,
    private router: Router
  ) {
    this.identity = this._userService.getIdentity();
   }

  ngOnInit(): void {
    if (this.identity) {
      this._clienteService.get_clientes().subscribe(
        response => {
          this.clientes = response.clientes;
        });
      this._productoService.get_productos('').subscribe(
          response => {
            this.productos = response.productos;
          }
        );

    } else {
      this.router.navigate(['']);
    }
  }
  close_alert() {
    this.error_message = '';
  }


  // Obtenemos todos los datos del producto con su ID seleccionado en SELECT
  get_data_producto(id) {


    this._productoService.get_producto(id).subscribe(
      response => {
        this.producto = response.producto;

      }
    );
  }

  save_detalle(detalleForm) {

    if (detalleForm.valid) {
      // la cantidad no debe ser mayor al stock
      if (detalleForm.value.cantidad <= this.producto.stock) {
      // agregamos venta por venta en un array con push
      this.data_detalle.push({
        idproducto: detalleForm.value.idproducto,
        cantidad: detalleForm.value.cantidad,
        producto: this.producto.titulo,
        producto_venta: this.producto.precio_venta,
      });
      // se esta vaciando el array para que se elija un nuevo prod. en el select
      this.detalle = this.detalleVenta;
      this.producto.stock = '--|--';
      this.total = this.total + (parseInt(this.producto.precio_venta) * parseInt(detalleForm.value.cantidad));
      } else {
        this.error_message = 'No existe suficiente stock para la venta';
      }
    }

  }

  // Eliminar una columna de tabla de 'productos' al hacer click  en el icono eliminar
  eliminar(idx, precio_venta, cantidad) {
    this.data_detalle.splice(idx, 1);
    this.total = this.total - (parseInt(precio_venta) * (parseInt(cantidad)));
  }

  onSubmit(ventaForm) {
    if (ventaForm.valid) {
      // si se selecciona 'SELECCIONAR' en clientes es error
      if (ventaForm.value.idcliente !== 'SELECCIONAR') {
        // almacenamos idcliente, iduser y detalles en la varialbe 'data' 
        var data = {
          idcliente: ventaForm.value.idcliente,
          iduser: this.identity._id,
          detalles: this.data_detalle
        };
        // llamamos al servicio de save_data
        this._ventaService.save_data(data).subscribe(
          response => {
            this.router.navigate(['ventas']);
          }
        );

      } else {
        console.log('error');
      }
    }
  }


}
