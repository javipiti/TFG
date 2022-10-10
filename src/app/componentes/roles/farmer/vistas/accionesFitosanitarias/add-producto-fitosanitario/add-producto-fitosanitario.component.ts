import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { productoFitosanitarioI } from 'src/app/utils/interfaces/peticiones.component';

@Component({
  selector: 'app-add-producto-fitosanitario',
  templateUrl: './add-producto-fitosanitario.component.html',
  styleUrls: ['./add-producto-fitosanitario.component.css']
})
export class AddProductoFitosanitarioComponent implements OnInit {

  id: any;
  explotacionID: any;
  invalido: boolean;
  error_farmID: string;
  mensaje: string;


  productoForm = new FormGroup({
    reference: new FormControl(0, Validators.required),
    commercial_name: new FormControl('', Validators.required),
    active_substance: new FormControl('', Validators.required),
    dose: new FormControl(0, Validators.required)
  });

  constructor(private api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.explotacionID = this.router.snapshot.paramMap.get('explotacionID');
  }

  addProducto(productoForm: productoFitosanitarioI) {
    if (this.productoForm.valid) {
      this.api.postPhytosanitaryProduct(this.id, productoForm).subscribe(data => {
        this.mensaje = "Producto fitosanitario añadida con éxito. "
      });
    } else {
      this.invalido = true;
    }
  }

  reset() {
    this.invalido = false;
    this.productoForm.reset();
    this.error_farmID = "";
    this.mensaje = "";
  }

  get reference() { return this.productoForm.get('reference') };
  get commercial_name() { return this.productoForm.get('commercial_name') };
  get active_substance() { return this.productoForm.get('active_substance') };
  get dose() { return this.productoForm.get('dose') };

}
