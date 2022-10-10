import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { allAccionesAdminI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-consultar-acciones-fitosanitarias',
  templateUrl: './consultar-acciones-fitosanitarias.component.html',
  styleUrls: ['./consultar-acciones-fitosanitarias.component.css']
})
export class ConsultarAccionesFitosanitariasComponent implements OnInit {

  
  id: any;
  accionID:number;

  acciones:allAccionesAdminI;
  hay:boolean = false;
  error:string;
  farmID:number = 0;

  pages: number = 0;
  page: number = 1;
  size: number = 10;
  num_explotaciones: number = 0;
  first: boolean = false;
  last: boolean = false;

  page_size: number = 10;
  page_number: number = 1;
  
  constructor(private api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('explotacionID');    
    if(this.id){
      this.farmID = this.id;
      this.cargarAcciones();
    }
  }

  cargarAcciones(){
    this.api.getAllPhytosanitaryUser(this.farmID,0).subscribe(data => {
      if(data){        
      this.acciones = data;
      this.pages = this.acciones.totalPages;
      this.num_explotaciones = data.totalElements;
      this.first = data.first;
      this.last = data.last;
      if (data.totalElements < 10) {
        this.size = data.totalElements;
      }
      this.hay= true;
      this.error= "";
    }else{
      this.error = "No hay acciones en esa explotación.";
      this.hay = false;
    }
    }, err => {
      this.error = "No dispones de ninguna explotación con ese ID.";
      this.hay = false;
    })
  }

  guardarID(accionID:number){
    this.accionID = accionID;
  }

  deleteAccion(){
    this.api.deletePhytosanitary(this.accionID).subscribe(data => {
        this.cargarAcciones();
    })
  }

  paginaSiguiente(paginaActual: number) {
    this.api.getAllPhytosanitaryUser(this.farmID, paginaActual).subscribe(data => {
      this.acciones = data;
      this.pages = this.acciones.totalPages;
      this.num_explotaciones = data.totalElements;
      this.first = data.first;
      this.last = data.last;
      this.page = this.page + 1;
      if (data.last) {
        if (data.totalElements % 10 == 0) {
          this.size = 10;
        } else {
          this.size = data.totalElements % 10;
        }
      } else {
        if (data.totalElements > 10) {
          this.size = 10;
        } else {
          this.size = data.totalElements % 10;
        }
      }

    });
  }
  paginaAnterior(paginaActual: number) {
    this.api.getAllPhytosanitaryUser(this.farmID, paginaActual - 2).subscribe(data => {
      this.acciones = data;
      this.pages = this.acciones.totalPages;
      this.num_explotaciones = data.totalElements;
      this.first = data.first;
      this.last = data.last;
      this.page = this.page - 1;

      if (data.last) {
        this.size = data.totalElements % 10;
      } else {
        if (data.totalElements > 10) {
          this.size = 10;
        } else {
          this.size = data.totalElements % 10;
        }
      }
    });
  }

}
