import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { allControlesI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-consultar-controles-plagas',
  templateUrl: './consultar-controles-plagas.component.html',
  styleUrls: ['./consultar-controles-plagas.component.css']
})
export class ConsultarControlesPlagasComponent implements OnInit {

  id: any;
  farmID: number = 0;
  controlID: number;
  hay: boolean = false;
  error: string

  controles: allControlesI;

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
      this.cargarControles();
    }
  }

  cargarControles() {
    this.api.getAllControlUser(this.farmID, 0).subscribe(data => {
      if (data) {
        this.controles = data;
        this.pages = this.controles.totalPages;
        this.num_explotaciones = data.totalElements;
        this.first = data.first;
        this.last = data.last;
        if (data.totalElements < 10) {
          this.size = data.totalElements;
        }
        this.hay = true;
        this.error = "";
      } else {
        this.error = "No hay controles en esa explotación.";
        this.hay = false;
      }
    }, err => {
      this.error = "No dispones de ninguna explotación con ese ID.";
      this.hay = false;
    });


  }

  guardarID(controlID: number) {
    this.controlID = controlID;
  }

  deleteControl() {
    this.api.deleteControl(this.controlID).subscribe(data => {
      this.cargarControles();
    });
  }


  paginaSiguiente(paginaActual: number) {
    this.api.getAllControlUser(this.farmID, paginaActual).subscribe(data => {
      this.controles = data;
      this.pages = this.controles.totalPages;
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
    this.api.getAllControlUser(this.farmID, paginaActual - 2).subscribe(data => {
      this.controles = data;
      this.pages = this.controles.totalPages;
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
