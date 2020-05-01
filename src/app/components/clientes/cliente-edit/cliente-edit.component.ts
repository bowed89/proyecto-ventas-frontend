import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from 'src/app/models/Cliente';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {

  public id;
  public cliente = new Cliente('', '', '', '', 1);
  public success_message;
  public error_message;

  constructor(
    private route: ActivatedRoute,
    private _clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
      }
    );
    // obtenemos los datos del cliente con su ID
    this._clienteService.get_cliente(this.id).subscribe(
      response => {
        this.cliente = response.cliente;
      }
    );
  }

  success_alert() {
    this.success_message = '';
  }
  error_alert() {
    this.error_message = '';
  }

  onSubmit(clienteForm) {

    if (clienteForm.valid) {
      this._clienteService.update_cliente({
        _id: this.id,
        nombres: clienteForm.value.nombres,
        correo: clienteForm.value.correo,
        dni: clienteForm.value.dni
      }).subscribe(
        response => {
          this.success_message = 'Se actualizó los datos del cliente';
        }
      );
    } else {
      this.error_message = 'No se pudo actualizar los datos del cliente';

    }

  }

}
