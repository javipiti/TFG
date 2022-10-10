import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { allControlesAdminI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-control-plagas-admin',
  templateUrl: './control-plagas-admin.component.html',
  styleUrls: ['./control-plagas-admin.component.css']
})
export class ControlPlagasAdminComponent implements OnInit {


  controles: allControlesAdminI;

  pages: number = 0;
  page: number = 1;
  size: number = 10;
  num_controles: number = 0;
  first: boolean = false;
  last: boolean = false;

  page_size: number = 10;
  page_number: number = 1;

  hayInfo: boolean = true;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAllControles();
  }

  arreglarArray() {

    for (var i = 0; i < this.controles.content.length; i++) {
      switch (this.controles.content[i].advice_system) {
        case ('AE'):
          this.controles.content[i].advice_system = "Agricultura Ecológica";
          break;
        case ('PI'):
          this.controles.content[i].advice_system = "Producción Integrada";
          break;
        case ('CP'):
          this.controles.content[i].advice_system = "Certificación Privada";
          break;
        case ('AO'):
          this.controles.content[i].advice_system = "Asistida de un asesor";
          break;
        case ('AI'):
          this.controles.content[i].advice_system = "Agrupación de Tratamiento Integrado en Agricultura";
          break;
        default:
          this.controles.content[i].advice_system = "";
          break;
      }
    }


  }

  getAllControles() {
    this.api.getAllPest(0).subscribe(data => {
      if (data) {
        this.controles = data;
        this.arreglarArray();
        this.pages = this.controles.totalPages;
        this.num_controles = data.totalElements;
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
    this.api.getAllPest(paginaActual).subscribe(data => {
      this.controles = data;
      this.arreglarArray();
      this.pages = this.controles.totalPages;
      this.num_controles = data.totalElements;
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
    this.api.getAllPest(paginaActual - 2).subscribe(data => {
      this.controles = data;
      this.arreglarArray();
      this.pages = this.controles.totalPages;
      this.num_controles = data.totalElements;
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
