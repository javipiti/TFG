import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-subir-archivo-accion',
  templateUrl: './subir-archivo-accion.component.html',
  styleUrls: ['./subir-archivo-accion.component.css']
})
export class SubirArchivoAccionComponent implements OnInit {

  fileName = '';
  file: File;
  accionID:number;
  date:Date;
  error:string;
  mensaje:string;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {

    if (event.target.files[0]) {
      this.file = event.target.files[0];
      this.fileName = this.file.name;
    }

  }

  reset(){
    window.location.reload();
  }
  subirArchivo() {
    if (this.accionID && this.file && this.date) {
      this.api.postPhytosanitaryFile(this.accionID, this.file, this.date).subscribe(data => {
        this.error = "";
        this.mensaje = "Archivo subido correctamente."
      },err => {
        this.error = "ID de la acción fitosanitaria incorrecto.";
      });
    }else{
      this.error = "No se han completado todos los campos."
    }
    
  }

}
