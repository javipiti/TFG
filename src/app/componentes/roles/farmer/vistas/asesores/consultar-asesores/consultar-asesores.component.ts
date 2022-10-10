import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { allAsesoresI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-consultar-asesores',
  templateUrl: './consultar-asesores.component.html',
  styleUrls: ['./consultar-asesores.component.css']
})
export class ConsultarAsesoresComponent implements OnInit {

  id: any;
  farmID: number = 0;
  asesorID: number;
  hay: boolean = false;
  error: string


  asesores:allAsesoresI;

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
      this.cargarAsesores();
    }
  }

  cargarAsesores(){
    this.api.getAllAdvisor(this.farmID, 0).subscribe(data =>{
      if (data) {
        this.asesores = data;
        //this.arreglarArray();
        this.pages = this.asesores.totalPages;
        this.num_explotaciones = data.totalElements;
        this.first = data.first;
        this.last = data.last;
        if (data.totalElements < 10) {
          this.size = data.totalElements;
        }
        this.hay = true;
        this.error = "";
      } else {
        this.error = "No hay acciones en esa explotación.";
        this.hay = false;
      }
    }, err => {
      this.error = "No dispones de ninguna explotación con ese ID.";
      this.hay = false;
    });
  }

  guardarID(asesorID:number){
    this.asesorID = asesorID;
  }

  deleteAsesor(){
    this.api.deleteAdvisor(this.asesorID).subscribe(data => {
      this.cargarAsesores();
    });
  }


  paginaSiguiente(paginaActual: number) {
    this.api.getAllAdvisor(this.farmID, paginaActual).subscribe(data => {
      this.asesores = data;
      this.pages = this.asesores.totalPages;
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
    this.api.getAllAdvisor(this.farmID, paginaActual - 2).subscribe(data => {
      this.asesores = data;
      this.pages = this.asesores.totalPages;
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
