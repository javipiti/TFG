import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { allAnalisisAdminI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-analisis-admin',
  templateUrl: './analisis-admin.component.html',
  styleUrls: ['./analisis-admin.component.css']
})
export class AnalisisAdminComponent implements OnInit {


  analisis: allAnalisisAdminI;

  pages: number = 0;
  page: number = 1;
  size: number = 10;
  num_analisis: number = 0;
  first: boolean = false;
  last: boolean = false;

  page_size: number = 10;
  page_number: number = 1;

  hayInfo: boolean = true;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAllAnalisis();
  }

  arreglarArray() {
    for (var i = 0; i < this.analisis.content.length; i++) {
      if (this.analisis.content[i].date)
        this.analisis.content[i].date = this.analisis.content[i].date.slice(0, 10);

      switch (this.analisis.content[i].analysis_type) {
        case ('WATER'):
          this.analisis.content[i].analysis_type = "Agua";
          break;
        case ('VEGETABLE'):
          this.analisis.content[i].analysis_type = "Vegetal";
          break;
        case ('SOIL'):
          this.analisis.content[i].analysis_type = "Suelo";
          break;
        default:
          this.analisis.content[i].analysis_type = "";
          break;
      }

      switch (this.analisis.content[i].place) {
        case ('PLOT'):
          this.analisis.content[i].place = "Parcela";
          break;
        case ('SAMPLED_BATCH'):
          this.analisis.content[i].place = "Lote de muestra";
          break;
        default:
          this.analisis.content[i].place = "";
          break;
      }
    }
  }

  getAllAnalisis() {
    this.api.getAllAnalysis(0).subscribe(data => {
      if (data) {
        this.analisis = data;
        this.arreglarArray();
        this.pages = this.analisis.totalPages;
        this.num_analisis = data.totalElements;
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
    this.api.getAllAnalysis(paginaActual).subscribe(data => {
      this.analisis = data;
      this.arreglarArray();
      this.pages = this.analisis.totalPages;
      this.num_analisis = data.totalElements;
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
    this.api.getAllAnalysis(paginaActual - 2).subscribe(data => {
      this.analisis = data;
      this.arreglarArray();
      this.pages = this.analisis.totalPages;
      this.num_analisis = data.totalElements;
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
