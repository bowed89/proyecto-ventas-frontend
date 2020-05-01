import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cliente-index',
  templateUrl: './cliente-index.component.html',
  styleUrls: ['./cliente-index.component.css']
})
export class ClienteIndexComponent implements OnInit {

  public clientes;
  public p: number = 1;
  public collection: any[];


  constructor(
    private _clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this._clienteService.get_clientes().subscribe(
      response => {
        this.clientes = response.clientes;
      }
    );
  }

  eliminar(id) {
    Swal.fire({
      title: '¿Está seguro de eliminar el cliente?',
      text: "No se podrá recuperar el cliente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Cliente eliminado!',
          'Se eliminó correctamente',
          'success'
        );

        this._clienteService.delete_cliente(id).subscribe(
          response => {

            // se llama nuevamente al listado de obtener clientes para mostrar la nueva lista
            this._clienteService.get_clientes().subscribe(
              response => {
                this.clientes = response.clientes;
              }
            );
          }
        );




        } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Se canceló la solicitud',
          'error'
        );
      }});
  }

}
