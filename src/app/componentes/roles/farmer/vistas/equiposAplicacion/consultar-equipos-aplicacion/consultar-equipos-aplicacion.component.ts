import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { allEquiposI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-consultar-equipos-aplicacion',
  templateUrl: './consultar-equipos-aplicacion.component.html',
  styleUrls: ['./consultar-equipos-aplicacion.component.css']
})
export class ConsultarEquiposAplicacionComponent implements OnInit {

  id: any;
  farmID: number = 0;
  equipoID: number;
  hay: boolean = false;
  error: string

  equipos: allEquiposI;

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
    if (this.id) {
      this.farmID = this.id;
      this.cargarEquipos();
    }
  }
  cargarEquipos() {
    this.api.getAllEquipmentUser(this.farmID, 0).subscribe(data => {
      if (data) {
        this.equipos = data;
        this.pages = this.equipos.totalPages;
        this.num_explotaciones = data.totalElements;
        this.first = data.first;
        this.last = data.last;
        if (data.totalElements < 10) {
          this.size = data.totalElements;
        }
        this.hay = true;
        this.error = "";
      } else {
        this.error = "No hay equipos en esa explotación.";
        this.hay = false;
      }
    }, err => {
      this.error = "No dispones de ninguna explotación con ese ID.";
      this.hay = false;
    });
  }

  guardarID(equipoID: number) {
    this.equipoID = equipoID;
  }

  deleteEquipo() {
    this.api.deleteEquipment(this.equipoID).subscribe(data => {
      this.cargarEquipos();
    });
  }



  paginaSiguiente(paginaActual: number) {
    this.api.getAllEquipmentUser(this.farmID, paginaActual).subscribe(data => {
      this.equipos = data;
      this.pages = this.equipos.totalPages;
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
    this.api.getAllEquipmentUser(this.farmID, paginaActual - 2).subscribe(data => {
      this.equipos = data;
      this.pages = this.equipos.totalPages;
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
