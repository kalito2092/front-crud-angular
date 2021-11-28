import { ToastrService } from 'ngx-toastr';
import { ProductoService } from './../../services/producto.service';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];

  constructor(private _productoSevice: ProductoService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this._productoSevice.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    },error =>{
      console.log(error);
    })
  }

  eliminarProducto(id: any){
     this._productoSevice.eliminarProducto(id).subscribe(data => {
        this.toastr.success('El producto fue eliminado con exito', 'Producto Eliminado');
        this.obtenerProductos();
     }, error => {
        this.toastr.error('El producto no ha podido ser eliminado', 'Producto No Eliminado');

     })
  }

}
