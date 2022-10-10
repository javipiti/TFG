import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-subida-masiva',
  templateUrl: './subida-masiva.component.html',
  styleUrls: ['./subida-masiva.component.css']
})
export class SubidaMasivaComponent implements OnInit {

  fileName = '';
  file: File;
  tipo:string =''; 
  error: string;
  mensaje:string;
  farmID:number;

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
    this.tipo = null;
    this.error = null;
    this.mensaje = null;
    this.farmID = null;
  }

  subirArchivo() {
    if (this.file && this.farmID && this.tipo) {    
      this.api.uploadCSVFile(this.farmID,this.tipo ,this.file).subscribe(data => {
        this.error = "";
        this.mensaje = "Archivo subido con éxito.";
      }, err => {
        if(err.status == 404){
          this.error = "El ID de la explotación es incorrecto.";
        }

        if(err.status == 500){
          this.error = "El archivo no está bien formado o no corresponde el tipo de archivo.";
        }
        
      })
    }else{
      this.error = "Completa todos los campos."
    }
  }
  

}
