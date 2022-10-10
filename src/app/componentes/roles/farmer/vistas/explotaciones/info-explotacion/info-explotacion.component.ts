import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { farmI } from 'src/app/utils/interfaces/peticiones.component';
import { getFilesFarmI, plotIdentificationRI, sigpacRI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-info-explotacion',
  templateUrl: './info-explotacion.component.html',
  styleUrls: ['./info-explotacion.component.css']
})
export class InfoExplotacionComponent implements OnInit {


  id: any;
  farm: farmI = { id: 0, farm_type: '' };
  farmInfo: plotIdentificationRI = {
    liczepa: '', id: 0, area: 0, crop: '', REXA_variety: '', seedTime: '', collectionTime: '', SIGPAC: {
      sigpacuse: '',
      id: 0,
      province: '',
      municipality: '',
      zone: '',
      polygon: '',
      enclosure: '',
      SIGPAC_use: ''
    },
    type: '', 'open/protected': '', integrated_system_advice: '', entryDate: '', dischargeDate: '', 'LIC/ZEPA': '',
    vulnerable_nitrate_zone: '', 'well/water intake distance': 0, 'river/reservoir distance': 0, control_station_reference: '', tenure_regime: ''
  };

  SIGPAC: sigpacRI = {
    sigpacuse: '',
    id: 0,
    province: '',
    municipality: '',
    zone: '',
    polygon: '',
    enclosure: '',
    SIGPAC_use: ''
  };
  open: string;
  liz: string;
  water: number;
  river: number;
  tipo: string;
  tipoExplotacion: string;
  sistema: string;
  vulnerable: string;

  archivos: getFilesFarmI;

  pagesFiles: number = 0;
  pageFiles: number = 1;
  sizeFiles: number = 10;
  num_files: number = 0;
  firstFiles: boolean = false;
  lastFiles: boolean = false;

  page_sizeFiles: number = 10;
  page_numberFiles: number = 1;

  hayInfo: boolean = true;
  hayArchivos: boolean = true;

  constructor(private api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.getFarm();
    this.getFarmInfo();
    this.getFiles();

  }

  arreglarArray() {
    switch (this.tipoExplotacion) {
      case ('ecological_agriculture'):
        this.tipoExplotacion = "Agricultura ecológica";
        break;
      case ('integrated_production'):
        this.tipoExplotacion = "Producción integrada";
        break;
      case ('advised'):
        this.tipoExplotacion = "Cultivos asesorados";
        break;
      case ('extensive'):
        this.tipoExplotacion = "Extensa";
        break;
      case ('not_advised'):
        this.tipoExplotacion = "Cultivos no asesorados";
        break;
      default:
        this.tipoExplotacion = "";
        break;
    }
  }
  arreglarArray2() {

    this.farmInfo.dischargeDate = this.farmInfo.dischargeDate.slice(0, 10);
    this.farmInfo.entryDate = this.farmInfo.entryDate.slice(0, 10);

    switch (this.liz) {
      case ('YES'):
        this.liz = "Sí";
        break;
      case ('NO'):
        this.liz = "No";
        break;
      default:
        this.liz = "";
        break;
    }

    switch (this.vulnerable) {
      case ('YES'):
        this.vulnerable = "Sí";
        break;
      case ('NO'):
        this.vulnerable = "No";
        break;
      default:
        this.vulnerable = "";
        break;
    }

    switch (this.open) {
      case ('M'):
        this.open = "Malla";
        break;
      case ('BP'):
        this.open = "Bajo plástico";
        break;
      case ('INV'):
        this.open = "Invernadero";
        break;
      default:
        this.open = "";
        break;
    }

    switch (this.tipo) {
      case ('R'):
        this.tipo = "Regadio";
        break;
      case ('S'):
        this.tipo = "Secano";
        break;
      default:
        this.tipo = "";
        break;
    }

    switch (this.sistema) {
      case ('AE'):
        this.sistema = "Agricultura Ecológica";
        break;
      case ('PI'):
        this.sistema = "Producción Integrada";
        break;
      case ('CP'):
        this.sistema = "Certificación Privada";
        break;
      case ('AO'):
        this.sistema = "Asistida de un asesor";
        break;
      case ('AI'):
        this.sistema = "Agrupación de Tratamiento Integrado en Agricultura";
        break;
      case ('GC'):
        this.sistema = "Sin obligación de aplicar la GIP";
        break;
      default:
        this.sistema = "";
        break;
    }
  }

  resetFarm(){
    this.getFarm();
  }

  resetFarmInfo(){
    this.getFarmInfo();
  }

  getFarm() {
    this.api.getFarm(this.id).subscribe(data => {
      this.farm = data;
      this.tipoExplotacion = data.farm_type;
      this.arreglarArray();
    });
  }

  getFarmInfo() {
    this.api.getPlotIdentification(this.id).subscribe(data => {
      if (!data) {
        this.hayInfo = false;
      } else {
        this.farmInfo = data;
        this.SIGPAC = data.SIGPAC
        this.open = data['open/protected'];
        this.liz = data['LIC/ZEPA'];
        this.tipo = data.type;
        this.sistema = data.integrated_system_advice;
        this.water = data['well/water intake distance'];
        this.river = data['river/reservoir distance'];
        this.vulnerable = data.vulnerable_nitrate_zone;
        this.arreglarArray2();
      }
    });
  }

  updatePlotID() {
    this.api.updatePlotID(this.farmInfo, this.id).subscribe(data => {
      this.getFarmInfo();
    })
  }

  updateFarm() {
    this.api.updateFarm(this.farm).subscribe(data => {
      this.getFarm();
    })
  }

  descargarFarmBook() {
    this.api.getFarmBookUser(this.id).subscribe(data => {
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "Cuaderno de explotacion";
      link.click();

    }, err => {
    });
  }

  arreglarArrayArchivos() {
    for (var i = 0; i < this.archivos.content.length; i++) {
      switch (this.archivos.content[i].status) {
        case ('VERIFIED'):
          this.archivos.content[i].status = "Verificado";
          break;
        case ('EXPIRED'):
          this.archivos.content[i].status = "Expirado";
          break;
        case ('REJECTED'):
          this.archivos.content[i].status = "Rechazado";
          break;
        case ('WAITING_VERIFICATION'):
          this.archivos.content[i].status = "Esperando verificación";
          break;
        case ('ABOUT_TO_EXPIRE'):
          this.archivos.content[i].status = "Apunto de expirar";
          break;
        case (''):
          break;
        case (''):
          break;
        default:
          this.archivos.content[i].status = "";
          break;
      }
    }

  }

  getFiles() {
    this.api.getAllFarmFiles(this.id, 0).subscribe(data => {
      if (data) {
        this.archivos = data;
        this.arreglarArrayArchivos();
        this.pagesFiles = this.archivos.totalPages;
        this.num_files = data.totalElements;
        this.firstFiles = data.first;
        this.lastFiles = data.last;
        if (data.totalElements < 10) {
          this.sizeFiles = data.totalElements;
        }

        this.hayArchivos = true;
      } else {
        this.hayArchivos = false;
      }
    }, err => {
    });
  }

  paginaSiguienteFiles(paginaActualFiles: number) {
    this.api.getAllFarmFiles(this.id, paginaActualFiles).subscribe(data => {
      this.archivos = data;
      this.arreglarArrayArchivos();
      this.pagesFiles = this.archivos.totalPages;
      this.num_files = data.totalElements;
      this.firstFiles = data.first;
      this.lastFiles = data.last;
      this.pageFiles = this.pageFiles + 1;
      if (data.last) {
        if (data.totalElements % 10 == 0) {
          this.sizeFiles = 10;
        } else {
          this.sizeFiles = data.totalElements % 10;
        }
      } else {
        if (data.totalElements > 10) {
          this.sizeFiles = 10;
        } else {
          this.sizeFiles = data.totalElements % 10;
        }
      }

    });
  }
  paginaAnteriorFiles(paginaActualFiles: number) {
    this.api.getAllFarmFiles(this.id, paginaActualFiles - 2).subscribe(data => {
      this.archivos = data;
      this.arreglarArrayArchivos();
      this.pagesFiles = this.archivos.totalPages;
      this.num_files = data.totalElements;
      this.firstFiles = data.first;
      this.lastFiles = data.last;
      this.pageFiles = this.pageFiles - 1;

      if (data.last) {
        this.sizeFiles = data.totalElements % 10;
      } else {
        if (data.totalElements > 10) {
          this.sizeFiles = 10;
        } else {
          this.sizeFiles = data.totalElements % 10;
        }
      }
    });
  }

}
