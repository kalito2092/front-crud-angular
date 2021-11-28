import { ProductoService } from './../../services/producto.service';
import { Producto } from './../../models/producto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm : FormGroup
  titulo : string = "Crear Producto"
  btnTexto : string = "Crear"
  id : string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoSevice: ProductoService,
    private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group({
        producto : ['', Validators.required],
        categoria : ['', Validators.required],
        ubicacion : ['', Validators.required],
        precio : ['', Validators.required],

    })

    this.id = this.aRouter.snapshot.paramMap.get('id')!;

   }

  ngOnInit(): void {
    this.esEditar();
  }

  crearProducto(){
    const nuevo_producto : Producto = {
        nombre : this.productoForm.get('producto')?.value,
        categoria : this.productoForm.get('categoria')?.value,
        ubicacion : this.productoForm.get('ubicacion')?.value,
        precio : this.productoForm.get('precio')?.value,

    }

    if(this.id !== null){
      //EDITAR
      this._productoSevice.editarProducto(this.id, nuevo_producto).subscribe(data => {
        this.toastr.success('El producto ha sido actualizado con éxito', 'Producto Actualizado',{
           timeOut: 3000,
           });
           this.router.navigate(['/']);
        }, error => {
            this.toastr.error('El producto no ha podido ser actualizado', 'Producto No Actualizado');
            this.productoForm.reset();
        })

    }else{
      //CREAR
      this._productoSevice.guardarProducto(nuevo_producto).subscribe(data => {
            this.toastr.success('El producto ha sido registrado con éxito', 'Nuevo producto registrado',{
              timeOut: 3000,
            });
            this.router.navigate(['/']);
        }, error => {
            this.toastr.error('El producto no ha podido ser creado', 'Producto No Creado');
            this.productoForm.reset();
        })

    }



  }


  esEditar(){
    //Hace los cambios en el formulario de creación cuando se entra como edición
    //Rellena los datos del producto a editar
    if(this.id !== null){
      this.titulo = "Editar Producto";
      this.btnTexto = "Editar";
      this._productoSevice.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto : data.nombre,
          categoria : data.categoria,
          ubicacion : data.ubicacion,
          precio : data.precio
        })
      })
    }
  }


}
