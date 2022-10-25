import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { allHarvestI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-consultar-cosechas',
  templateUrl: './consultar-cosechas.component.html',
  styleUrls: ['./consultar-cosechas.component.css']
})
export class ConsultarCosechasComponent implements OnInit {

  id: any;

  cosechas: allHarvestI;
  hay: boolean = false;
  error: string;
  farmID: number = 0;
  harvestID: number;

  pages: number = 0;
  page: number = 1;
  size: number = 10;
  num_explotaciones: number = 0;
  first: boolean = false;
  last: boolean = false;

  page_size: number = 10;
  page_number: number = 1;

  mensaje: string;

  constructor(private api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('explotacionID');
    if (this.id) {
      this.farmID = this.id;
      this.cargarCosechas();
    }
  }

  arreglarArray() {
    for (var i = 0; i < this.cosechas.content.length; i++) {
      if (this.cosechas.content[i].date)
        this.cosechas.content[i].date = this.cosechas.content[i].date.slice(0, 10);
    }
  }

  cargarCosechas() {
    this.api.getAllHarvestUser(this.farmID, 0).subscribe(data => {
      if (data) {
        this.cosechas = data;
        this.arreglarArray();
        this.pages = this.cosechas.totalPages;
        this.num_explotaciones = data.totalElements;
        this.first = data.first;
        this.last = data.last;
        if (data.totalElements < 10) {
          this.size = data.totalElements;
        }

        this.hay = true;
        this.error = "";
      } else {
        this.error = "No hay cosechas en esa explotación.";
        this.hay = false;
      }
    }, err => {
      this.error = "No dispones de ninguna explotación con ese ID.";
      this.hay = false;
    })
  }

  guardarID(harvestID: number) {
    this.harvestID = harvestID;
  }

  deleteCosecha() {
    this.api.deleteHarvest(this.harvestID).subscribe(data => {
      this.cargarCosechas();
    })
  }

  paginaSiguiente(paginaActual: number) {
    this.api.getAllHarvestUser(this.farmID, paginaActual).subscribe(data => {
      this.cosechas = data;
      this.pages = this.cosechas.totalPages;
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
    this.api.getAllHarvestUser(this.farmID, paginaActual - 2).subscribe(data => {
      this.cosechas = data;
      this.pages = this.cosechas.totalPages;
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
