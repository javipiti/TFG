import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-subir-archivo-analisis',
  templateUrl: './subir-archivo-analisis.component.html',
  styleUrls: ['./subir-archivo-analisis.component.css']
})
export class SubirArchivoAnalisisComponent implements OnInit {

  fileName = '';
  file: File;
  harvestID:number;
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
    this.fileName = null;
    this.file = null;
    this.harvestID = null;
    this.date = null;
    this.error = null;
    this.mensaje = null;
  }
  subirArchivo() {
    
    if (this.harvestID && this.file && this.date) {
      this.api.uploadAnalysisFile(this.harvestID, this.file, this.date).subscribe(data => {
        this.error = "";
        this.mensaje = "Archivo subido correctamente."
      },err => {
        this.error = "ID del análisis incorrecto.";
      });
    }else{
      this.error = "No se han completado todos los campos."
    }
    
  }

}
