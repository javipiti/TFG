import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { allAsesoresAdminI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-asesores-admin',
  templateUrl: './asesores-admin.component.html',
  styleUrls: ['./asesores-admin.component.css']
})
export class AsesoresAdminComponent implements OnInit {


  asesores: allAsesoresAdminI;

  pages: number = 0;
  page: number = 1;
  size: number = 10;
  num_asesores: number = 0;
  first: boolean = false;
  last: boolean = false;

  page_size: number = 10;
  page_number: number = 1;

  hayInfo: boolean = true;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAllAsesores();
  }

  arreglarArray() {
    for (var i = 0; i < this.asesores.content.length; i++) {
      if (this.asesores.content[i].discharge_date)
        this.asesores.content[i].discharge_date = this.asesores.content[i].discharge_date.slice(0, 10);
      if (this.asesores.content[i].creation_date)
        this.asesores.content[i].creation_date = this.asesores.content[i].creation_date.slice(0, 10);
      if (this.asesores.content[i].admission_date)
        this.asesores.content[i].admission_date = this.asesores.content[i].admission_date.slice(0, 10);

      switch (this.asesores.content[i].license_type) {
        case ('basic'):
          this.asesores.content[i].license_type = "Básica";
          break;
        case ('qualified'):
          this.asesores.content[i].license_type = "Calificado";
          break;
        case ('blocked'):
          this.asesores.content[i].license_type = "Bloqueada";
          break;
        case ('fumigator'):
          this.asesores.content[i].license_type = "Fumigador";
          break;
        case ('adviser'):
          this.asesores.content[i].license_type = "Asesor";
          break;

        default:
          this.asesores.content[i].license_type = "";
          break;
      }

    }
  }

  getAllAsesores() {
    this.api.getAllAdvisorStaff(0).subscribe(data => {
      if (data) {
        this.asesores = data;
        this.arreglarArray();
        this.pages = this.asesores.totalPages;
        this.num_asesores = data.totalElements;
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
    this.api.getAllAdvisorStaff(paginaActual).subscribe(data => {
      this.asesores = data;
      this.arreglarArray();
      this.pages = this.asesores.totalPages;
      this.num_asesores = data.totalElements;
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
    this.api.getAllAdvisorStaff(paginaActual - 2).subscribe(data => {
      this.asesores = data;
      this.arreglarArray();
      this.pages = this.asesores.totalPages;
      this.num_asesores = data.totalElements;
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
