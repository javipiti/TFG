import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { allFarmsAdminI, plotIdentificationRI, userRI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-explotaciones-admin',
  templateUrl: './explotaciones-admin.component.html',
  styleUrls: ['./explotaciones-admin.component.css']
})
export class ExplotacionesAdminComponent implements OnInit {

  
  explotaciones: allFarmsAdminI;

  user: userRI  = {
    id: 0, keepLogged: false, role: { id: 0, role_type: '', name: '' },
    nif: '', name: '', surname: '', email: '', password: '', NIF: '', phone: 0, address: '', postal_code: 0, province: '', state: '', country: '', creation_date: '',
    validation_status: ''
  };;

  plotID: plotIdentificationRI = {
    liczepa: '',
    id: 0,
    area: 0,
    crop: '',
    REXA_variety: '',
    seedTime: '',
    collectionTime: '',
    SIGPAC: { id: 0, enclosure: '', municipality: '', polygon: '', province: '', SIGPAC_use: '', sigpacuse: '', zone: '' },
    type: '',
    'open/protected': '',
    integrated_system_advice: '',
    entryDate: '',
    dischargeDate: '',
    'LIC/ZEPA': '',
    vulnerable_nitrate_zone: '',
    'well/water intake distance': 0,
    'river/reservoir distance': 0,
    control_station_reference: '',
    tenure_regime: ''
  }

  pages: number = 0;
  page: number = 1;
  size: number = 10;
  num_explotaciones: number = 0;
  first: boolean = false;
  last: boolean = false;

  page_size: number = 10;
  page_number: number = 1;

  hayInfo: boolean = true;
  mostrarPlotID: boolean = false;
  farmID: number = 0;
  existePLOT: boolean = true;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAllExplotaciones();
    this.getUser();
  }

  getUser() {
    this.api.getUser().subscribe(data => {
      this.user = data;      
    });
  }

  arreglarArray() {

    this.plotID.dischargeDate = this.plotID.dischargeDate.slice(0, 10);
    this.plotID.entryDate = this.plotID.entryDate.slice(0, 10);

    switch (this.plotID.liczepa) {
      case ('YES'):
        this.plotID.liczepa = "Sí";
        break;
      case ('NO'):
        this.plotID.liczepa = "No";
        break;
      default:
        this.plotID.liczepa = "";
        break;
    }

    switch (this.plotID.vulnerable_nitrate_zone) {
      case ('YES'):
        this.plotID.vulnerable_nitrate_zone = "Sí";
        break;
      case ('NO'):
        this.plotID.vulnerable_nitrate_zone = "No";
        break;
      default:
        this.plotID.vulnerable_nitrate_zone = "";
        break;
    }

    switch (this.plotID['open/protected']) {
      case ('M'):
        this.plotID['open/protected'] = "Malla";
        break;
      case ('BP'):
        this.plotID['open/protected'] = "Bajo plástico";
        break;
      case ('INV'):
        this.plotID['open/protected'] = "Invernadero";
        break;
      default:
        this.plotID['open/protected'] = "";
        break;
    }

    switch (this.plotID.type) {
      case ('R'):
        this.plotID.type = "Regadio";
        break;
      case ('S'):
        this.plotID.type = "Secano";
        break;
      default:
        this.plotID.type = "";
        break;
    }

    switch (this.plotID.integrated_system_advice) {
      case ('AE'):
        this.plotID.integrated_system_advice = "Agricultura Ecológica";
        break;
      case ('PI'):
        this.plotID.integrated_system_advice = "Producción Integrada";
        break;
      case ('CP'):
        this.plotID.integrated_system_advice = "Certificación Privada";
        break;
      case ('AO'):
        this.plotID.integrated_system_advice = "Asistida de un asesor";
        break;
      case ('AI'):
        this.plotID.integrated_system_advice = "Agrupación de Tratamiento Integrado en Agricultura";
        break;
      case ('GC'):
        this.plotID.integrated_system_advice = "Sin obligación de aplicar la GIP";
        break;
      default:
        this.plotID.integrated_system_advice = "";
        break;
    }
  }

  arreglarArray2() {
    for(var i=0;i<this.explotaciones.content.length;i++){

      switch (this.explotaciones.content[i].farm.farm_type) {
        case ('ecological_agriculture'):
          this.explotaciones.content[i].farm.farm_type = "Agricultura ecológica";
          break;
        case ('integrated_production'):
          this.explotaciones.content[i].farm.farm_type = "Producción integrada";
          break;
        case ('advised'):
          this.explotaciones.content[i].farm.farm_type = "Cultivos asesorados";
          break;
        case ('extensive'):
          this.explotaciones.content[i].farm.farm_type = "Extensa";
          break;
        case ('not_advised'):
          this.explotaciones.content[i].farm.farm_type = "Cultivos no asesorados";
          break;
        default:
          this.explotaciones.content[i].farm.farm_type = "";
          break;
      }
    }
    
  }

  getAllExplotaciones() {
    this.api.getAllFarms(0).subscribe(data => {
      if (data) {
        this.explotaciones = data;
        this.arreglarArray2();
        this.pages = this.explotaciones.totalPages;
        this.num_explotaciones = data.totalElements;
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
    this.api.getAllFarms(paginaActual).subscribe(data => {
      this.explotaciones = data;
      this.arreglarArray2();
      this.pages = this.explotaciones.totalPages;
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
    this.api.getAllFarms(paginaActual - 2).subscribe(data => {
      this.explotaciones = data;
      this.arreglarArray2();
      this.pages = this.explotaciones.totalPages;
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

  verPlotID(farmID?: number) {
    this.mostrarPlotID = true;
    const first = this.explotaciones.content.find((obj) => {
      return obj.farm.id === farmID;
    });
    if (first != undefined) {
      this.farmID = first.farm.id;
      if (first.plotIdentification != undefined) {
        this.plotID = first.plotIdentification;
        this.existePLOT = true;
        this.arreglarArray();
      } else {
        this.existePLOT = false;
      }
    }
  }

  descargarArchivo(farmID:number){
    this.api.getFarmBook(farmID).subscribe(data => {
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "Cuaderno de explotacion";
      link.click();
    })
  }

}
