import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { allAnalisisI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-consultar-analisis',
  templateUrl: './consultar-analisis.component.html',
  styleUrls: ['./consultar-analisis.component.css']
})
export class ConsultarAnalisisComponent implements OnInit {

  id: any;
  farmID: number = 0;
  analisisID: number;
  hay: boolean = false;
  error: string


  analisis: allAnalisisI;

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
      this.cargarAnalisis();
    }
  }

  arreglarArray() {
    for (var i = 0; i < this.analisis.content.length; i++) {
      if (this.analisis.content[i].date)
        this.analisis.content[i].date = this.analisis.content[i].date.slice(0, 10);
    }
  }

  cargarAnalisis() {

    this.api.getAllAnalysisUser(this.farmID, 0).subscribe(data => {
      if (data) {
        this.analisis = data;
        this.arreglarArray();
        this.pages = this.analisis.totalPages;
        this.num_explotaciones = data.totalElements;
        this.first = data.first;
        this.last = data.last;
        if (data.totalElements < 10) {
          this.size = data.totalElements;
        }
        this.hay = true;
        this.error = "";
      } else {
        this.error = "No hay análisis en esa explotación.";
        this.hay = false;
      }
    }, err => {
      this.error = "No dispones de ninguna explotación con ese ID.";
      this.hay = false;
    });
  }
  guardarID(analisisID: number) {
    this.analisisID = analisisID;
  }


  deleteAnalisis() {
    this.api.deleteAnalysis(this.analisisID).subscribe(data => {
      this.cargarAnalisis();
    });
  }

  paginaSiguiente(paginaActual: number) {
    this.api.getAllAnalysisUser(this.farmID, paginaActual).subscribe(data => {
      this.analisis = data;
      this.pages = this.analisis.totalPages;
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
    this.api.getAllAnalysisUser(this.farmID, paginaActual - 2).subscribe(data => {
      this.analisis = data;
      this.pages = this.analisis.totalPages;
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
