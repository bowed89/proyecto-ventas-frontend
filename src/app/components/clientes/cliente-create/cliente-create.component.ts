import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/Cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  public cliente = new Cliente('', '', '', '', 1);

  constructor(
    private _clienteService: ClienteService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(clienteForm) {
    if (clienteForm.valid) {

      this._clienteService.insert_cliente({
        nombres: clienteForm.value.nombres,
        dni: clienteForm.value.dni,
        correo: clienteForm.value.correo
      }).subscribe(
        response => {
          console.log(response);
          
        }, error => {

        }
      );
    }
  }

}
