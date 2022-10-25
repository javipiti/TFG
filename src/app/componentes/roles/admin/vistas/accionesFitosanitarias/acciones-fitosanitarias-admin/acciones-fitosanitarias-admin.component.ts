import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { allAccionesAdminI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-acciones-fitosanitarias-admin',
  templateUrl: './acciones-fitosanitarias-admin.component.html',
  styleUrls: ['./acciones-fitosanitarias-admin.component.css']
})
export class AccionesFitosanitariasAdminComponent implements OnInit {


  acciones: allAccionesAdminI;

  pages: number = 0;
  page: number = 1;
  size: number = 10;
  num_acciones: number = 0;
  first: boolean = false;
  last: boolean = false;
  orden: string;

  page_size: number = 10;
  page_number: number = 1;

  hayInfo: boolean = true;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAllAcciones();
  }

  arreglarArray() {
    for (var i = 0; i < this.acciones.content.length; i++) {
      if (this.acciones.content[i].date)
        this.acciones.content[i].date = this.acciones.content[i].date.slice(0, 10);

      switch (this.acciones.content[i].advisory_order) {
        case (true):
          this.orden = "Si";
          break;
        case (false):
          this.orden = "No";
          break;
        default:
          this.orden = "";
          break;
      }

      switch (this.acciones.content[i].treated_surface) {
        case ('T'):
          this.acciones.content[i].treated_surface = "Total";
          break;
        case ('P'):
          this.acciones.content[i].treated_surface = "Parcial";
          break;
        case ('F'):
          this.acciones.content[i].treated_surface = "F";
          break;
        default:
          this.acciones.content[i].treated_surface = "";
          break;
      }
    }
  }

  getAllAcciones() {
    this.api.getAllPhitosanitary(0).subscribe(data => {
      if (data) {
        this.acciones = data;
        this.arreglarArray();
        this.pages = this.acciones.totalPages;
        this.num_acciones = data.totalElements;
        this.first = data.first;
        this.last = data.last;
        if (data.totalElements < 10) {
          this.size = data.totalElements;
        }
      } else {
        this.hayInfo = false;
      }

    });
  }

  paginaSiguiente(paginaActual: number) {
    this.api.getAllPhitosanitary(paginaActual).subscribe(data => {
      this.acciones = data;
      this.arreglarArray();
      this.pages = this.acciones.totalPages;
      this.num_acciones = data.totalElements;
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
    this.api.getAllPhitosanitary(paginaActual - 2).subscribe(data => {
      this.acciones = data;
      this.arreglarArray();
      this.pages = this.acciones.totalPages;
      this.num_acciones = data.totalElements;
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
