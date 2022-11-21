import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { getFilesI, contentI, userRI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-archivos-usuario',
  templateUrl: './archivos-usuario.component.html',
  styleUrls: ['./archivos-usuario.component.css']
})
export class ArchivosUsuarioComponent implements OnInit {


  farmID: number;

  archivos: any;

  getFile: getFilesI;
  getContent: contentI;

  user: userRI = {
    id: 0,
    keepLogged: false,
    role: { id: 0, role_type: '', name: '' },
    nif: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    NIF: '',
    phone: 0,
    address: '',
    postal_code: 0,
    province: '',
    state: '',
    country: '',
    creation_date: '',
    validation_status: '',
  };

  pagesFiles: number = 0;
  pageFiles: number = 1;
  sizeFiles: number = 10;
  num_files: number = 0;
  firstFiles: boolean = false;
  lastFiles: boolean = false;

  page_sizeFiles: number = 10;
  page_numberFiles: number = 1;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.api.getUser().subscribe(data => {
      this.user = data;
      this.cargarArchivos();
    });
  }

  arreglarArray() {
    for (var i = 0; i < this.archivos.content.length; i++) {
      if (this.archivos.content[i].upload_date) {
        this.archivos.content[i].upload_date = this.archivos.content[i].upload_date.slice(0, 10);
      }

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
          this.archivos.content[i].status = "A punto de expirar";
          break;
        default:
          this.archivos.content[i].status = "";
          break;
      }

      switch (this.archivos.content[i].type) {
        case ('HARVEST'):
          this.archivos.content[i].type = "Cosecha";
          break;
        case ('ANALYSIS'):
          this.archivos.content[i].type = "Análisis";
          break;
        case ('PHYTOSANITARY'):
          this.archivos.content[i].type = "Acción fitosanitaria";
          break;
        case ('ID_CARD'):
          this.archivos.content[i].type = "DNI";
          break;
        case ('CSV'):
          this.archivos.content[i].type = "CSV";
          break;
        default:
          this.archivos.content[i].type = "";
          break;
      }

      switch (this.archivos.content[i].expiration_status) {
        case ('VALID'):
          this.archivos.content[i].expiration_status = "Válido";
          break;
        case ('EXPIRED'):
          this.archivos.content[i].expiration_status = "Expirado";
          break;
        case ('ABOUT_TO_EXPIRE'):
          this.archivos.content[i].expiration_status = "Apunto de expirar";
          break;
        default:
          this.archivos.content[i].type = "";
          break;
      }
    }
  }
  cargarArchivos() {
    this.api.getAllFilesUser(this.user.id, 0).subscribe(data => {
      if (data) {
        this.archivos = data;
        this.arreglarArray();
        this.pagesFiles = this.archivos.totalPages;
        this.num_files = data.totalElements;
        this.firstFiles = data.first;
        this.lastFiles = data.last;
        if (data.totalElements < 10) {
          this.sizeFiles = data.totalElements;
        }
      }
    });
  }

  descargarFichero(ficheroID: number, tipoArchivo: string, url: string, name:string) {
    
    if (tipoArchivo === 'harvestFile') {
      var array = url.split('/', 4);
      var harvestID = parseInt(array[3]);

      this.api.getHarvestFile(harvestID, ficheroID).subscribe(data => {
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = name;
        link.click();

      })

    } else if (tipoArchivo === 'actionFile') {
      var array = url.split('/', 4);
      var accionID = parseInt(array[3]);

      this.api.getPhytosanitaryFile(accionID, ficheroID).subscribe(data => {
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = name;
        link.click();

      })
    } else if (tipoArchivo === 'userFile') {

      this.api.getFileUser(this.user.id, ficheroID).subscribe(data => {
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = name;
        link.click();

      })
    } else if (tipoArchivo === 'analysisFile') {
      
      var array = url.split('/', 4);
      var analisisID = parseInt(array[3]);

      this.api.downloadAnalysis(analisisID, ficheroID).subscribe(data => {
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = name;
        link.click();

      })
    }else if (tipoArchivo === 'CSV') {
      console.log("entro aqui");
      
      var array = url.split('/', 2);
      var analisisID = parseInt(array[1]);

      this.api.downloadAnalysis(analisisID, ficheroID).subscribe(data => {
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = name;
        link.click();

      })
    }
  }



  paginaSiguienteFiles(paginaActualFiles: number) {
    this.api.getAllFilesUser(this.user.id, paginaActualFiles).subscribe(data => {
      this.archivos = data;
      this.arreglarArray();
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
    this.api.getAllFilesUser(this.user.id, paginaActualFiles - 2).subscribe(data => {
      this.archivos = data;
      this.arreglarArray();
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
