import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { getFarmsI, contentFarmI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-consultar-explotaciones',
  templateUrl: './consultar-explotaciones.component.html',
  styleUrls: ['./consultar-explotaciones.component.css']
})
export class ConsultarExplotacionesComponent implements OnInit {


  farms: getFarmsI;
  contentFarm: contentFarmI[];
  hay:boolean;
  hayInfo:boolean;

  farmID: number;

  pages: number = 0;
  page: number = 1;
  size: number = 10;
  num_explotaciones: number = 0;
  first: boolean = false;
  last: boolean = false;

  page_size: number = 10;
  page_number: number = 1;

  tieneInfo: boolean = false;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadFarms();
  }

  arreglarArray() {
    for (var i = 0; i < this.farms.content.length; i++) {
      switch (this.farms.content[i].farm_type) {
        case ('ecological_agriculture'):
          this.farms.content[i].farm_type = "Agricultura ecológica";
          break;
        case ('integrated_production'):
          this.farms.content[i].farm_type = "Producción integrada";
          break;
        case ('advised'):
          this.farms.content[i].farm_type = "Cultivos asesorados";
          break;
        case ('extensive'):
          this.farms.content[i].farm_type = "Extensa";
          break;
        case ('not_advised'):
          this.farms.content[i].farm_type = "Cultivos no asesorados";
          break;
        default:
          this.farms.content[i].farm_type = "";
          break;
      }
    }
  }
  loadFarms() {
    this.api.getAllFarmsUser(0).subscribe(data => {
      if (data) {
        this.hay = true;
        this.farms = data;
        this.arreglarArray();
        this.pages = this.farms.totalPages;
        this.num_explotaciones = data.totalElements;
        this.first = data.first;
        this.last = data.last;
        if (data.totalElements < 10) {
          this.size = data.totalElements;
        }
      }else{
        this.hay = false;
      }
    });
  }


  descargarFarmBook(farmID: number) {
    this.api.getPlotIdentification(farmID).subscribe(data =>{
      if(data){
        this.api.getFarmBookUser(farmID).subscribe(data => {
          var downloadURL = window.URL.createObjectURL(data);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = "Cuaderno de explotacion";
          link.click();
        });
      }else{
        alert("Debe añadir primero la información de la explotación.");
      }
    })
    
  }

  guardarID(farmID: number) {
    this.farmID = farmID;
  }
  deleteFarm() {
    if (this.farmID)
      this.api.deleteFarm(this.farmID).subscribe(data => {
        window.location.reload();
      });
  }

  getPlotID(farmID?: number) {
    if (farmID)
      this.api.getPlotIdentification(farmID).subscribe(data => {
      });
  }
  getInfo(farmID?: number) {
    this.router.navigate(['/consultar-explotaciones', farmID]);
  }

  paginaSiguiente(paginaActual: number) {
    this.api.getAllFarmsUser(paginaActual).subscribe(data => {
      this.farms = data;
      this.pages = this.farms.totalPages;
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
    this.api.getAllFarmsUser(paginaActual - 2).subscribe(data => {
      this.farms = data;
      this.pages = this.farms.totalPages;
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