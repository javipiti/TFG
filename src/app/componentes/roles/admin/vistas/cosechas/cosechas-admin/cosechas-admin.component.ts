import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { allCosechasAdminI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-cosechas-admin',
  templateUrl: './cosechas-admin.component.html',
  styleUrls: ['./cosechas-admin.component.css']
})
export class CosechasAdminComponent implements OnInit {


  cosechas: allCosechasAdminI;

  pages: number = 0;
  page: number = 1;
  size: number = 10;
  num_cosechas: number = 0;
  first: boolean = false;
  last: boolean = false;

  page_size: number = 10;
  page_number: number = 1;

  hayInfo: boolean = true;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCosechas();
  }

  arreglarArray() {

    for (var i = 0; i < this.cosechas.content.length; i++) {
      this.cosechas.content[i].date = this.cosechas.content[i].date.slice(0, 10);
    }


  }

  getAllCosechas() {
    this.api.getAllHarvest(0).subscribe(data => {
      if (data) {
        this.cosechas = data;
        this.arreglarArray();
        this.pages = this.cosechas.totalPages;
        this.num_cosechas = data.totalElements;
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
    this.api.getAllHarvest(paginaActual).subscribe(data => {
      this.cosechas = data;
      this.arreglarArray();
      this.pages = this.cosechas.totalPages;
      this.num_cosechas = data.totalElements;
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
    this.api.getAllHarvest(paginaActual - 2).subscribe(data => {
      this.cosechas = data;
      this.arreglarArray();
      this.pages = this.cosechas.totalPages;
      this.num_cosechas = data.totalElements;
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
