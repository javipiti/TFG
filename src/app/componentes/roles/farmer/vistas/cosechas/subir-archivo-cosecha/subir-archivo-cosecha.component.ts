import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-subir-archivo-cosecha',
  templateUrl: './subir-archivo-cosecha.component.html',
  styleUrls: ['./subir-archivo-cosecha.component.css']
})
export class SubirArchivoCosechaComponent implements OnInit {

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
    this.file = null;
    this.harvestID = null;
    this.fileName = null;
    this.error = null;
    this.mensaje = null;
    this.date = null;

    //window.location.reload();
  }
  subirArchivo() {
    
    if (this.harvestID && this.file && this.date) {
      this.api.postHarvestFile(this.harvestID, this.file, this.date).subscribe(data => {
        this.error = "";
        this.mensaje = "Archivo subido correctamente."
      },err => {
        this.error = "ID de la cosecha incorrecto.";
      });
    }else{
      this.error = "No se han completado todos los campos."
    }
    
  }

}
