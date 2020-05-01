import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { GLOBAL } from '../../../services/global';
import Swal from 'sweetalert2';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {

  public productos;
  public url = GLOBAL.url;
  public filtro;
  public categorias;
  public titulo_cat;
  public descripcion_cat;
  public producto_stock;
  public producto_id;
  public success_message;

  public p: number = 1;
  public collection: any[];

  constructor(
    private _productoService: ProductoService,
  ) { }

  ngOnInit(): void {

    this._productoService.get_productos('').subscribe(
      response => {
        this.productos = response.productos;
        console.log(response);
      }
    );

    // Obtenemos datos de la tabla de 'categorias'
    this._productoService.get_categorias().subscribe(
      response => {
        this.categorias = response.categorias;
      });
  }
  search(searchForm) {
    // 'searchForm.value.filtro' obtiene el valor que se escribio en el input text
    this._productoService.get_productos(searchForm.value.filtro).subscribe(
      response => {
        this.productos = response.productos;
      }
    );

  }

  save_cat(categoriaForm) {

    if (categoriaForm.valid) {
      this._productoService.insert_categoria({
        titulo: categoriaForm.value.titulo_cat,
        descripcion: categoriaForm.value.descripcion_cat
      }).subscribe(
        response => {
          $('#modal-save-categoria').modal('hide');
          // luego de agregar una nueva categoria actualizamos la lista con las nuevas cateogorias
          this._productoService.get_categorias().subscribe(
            response => {
              this.categorias = response.categorias;
            }
          );
        });
      }
    }

  eliminar(id) {
    Swal.fire({
      title: '¿Está seguro de eliminar el producto?',
      text: "No se podrá recuperar el producto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Registro eliminado!',
          'Se eliminó correctamente',
          'success'
        );
        this._productoService.delete_producto(id).subscribe(
          response => {
            this._productoService.get_productos('').subscribe(
              response=>{
                this.productos = response.productos;
              });
          });
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

  get_id(id) {
    this.producto_id = id;
  }

  close_alert() {
    this.success_message = '';
  }

  aumentar_stock(stockForm) {
    if (stockForm.valid) {
      if (this.producto_id) {
        this._productoService.stock_producto({

          _id: this.producto_id,
          stock: stockForm.value.producto_stock

        }).subscribe(
          response =>  {
            this.success_message = 'Se aumentó el stock correctamente';
            this._productoService.get_productos('').subscribe(
              response => {
                this.productos = response.productos;
                $('.modal').modal('hide');
              });
            });
          }
        }
      }

  }
