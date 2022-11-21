import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { allFilesI, userRI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-archivos-admin',
  templateUrl: './archivos-admin.component.html',
  styleUrls: ['./archivos-admin.component.css']
})
export class ArchivosAdminComponent implements OnInit {


  allFiles: allFilesI;

  pagesFiles: number = 0;
  pageFiles: number = 1;
  sizeFiles: number = 10;
  num_files: number = 0;
  firstFiles: boolean = false;
  lastFiles: boolean = false;

  page_sizeFiles: number = 10;
  page_numberFiles: number = 1;

  user: userRI = {
    id: 0, keepLogged: false, role: { id: 0, role_type: '', name: '' },
    nif: '', name: '', surname: '', email: '', password: '', NIF: '', phone: 0, address: '', postal_code: 0, province: '', state: '', country: '', creation_date: '',
    validation_status: ''
  };

  constructor(private api: ApiService, private router: Router) { }

  arreglarArray() {
    for (var i = 0; i < this.allFiles.content.length; i++) {
      if (this.allFiles.content[i].upload_date)
        this.allFiles.content[i].upload_date = this.allFiles.content[i].upload_date.slice(0, 10);

      switch (this.allFiles.content[i].status) {
        case ('VERIFIED'):
          this.allFiles.content[i].status = "Verificado";
          break;
        case ('EXPIRED'):
          this.allFiles.content[i].status = "Expirado";
          break;
        case ('REJECTED'):
          this.allFiles.content[i].status = "Rechazado";
          break;
        case ('WAITING_VERIFICATION'):
          this.allFiles.content[i].status = "Esperando verificación";
          break;
        case ('ABOUT_TO_EXPIRE'):
          this.allFiles.content[i].status = "Apunto de expirar";
          break;
        default:
          this.allFiles.content[i].status = "";
          break;
      }

      switch (this.allFiles.content[i].type) {
        case ('HARVEST'):
          this.allFiles.content[i].type = "Cosecha";
          break;
        case ('ANALYSIS'):
          this.allFiles.content[i].type = "Análisis";
          break;
        case ('PHYTOSANITARY'):
          this.allFiles.content[i].type = "Acción fitosanitaria";
          break;
        case ('ID_CARD'):
          this.allFiles.content[i].type = "DNI";
          break;
        case ('CSV'):
          this.allFiles.content[i].type = "CSV";
          break;
        default:
          this.allFiles.content[i].type = "";
          break;
      }

      switch (this.allFiles.content[i].expiration_status) {
        case ('VALID'):
          this.allFiles.content[i].expiration_status = "Válido";
          break;
        case ('EXPIRED'):
          this.allFiles.content[i].expiration_status = "Expirado";
          break;
        case ('ABOUT_TO_EXPIRE'):
          this.allFiles.content[i].expiration_status = "Apunto de expirar";
          break;
        default:
          this.allFiles.content[i].type = "";
          break;
      }
    }
  }

  ngOnInit(): void {
    this.getUser();
    this.getAllFiles();
  }

  getUser() {
    this.api.getUser().subscribe(data => {
      this.user = data;
    });
  }

  getAllFiles() {
    this.api.getAllFilesAdmin(0).subscribe(data => {
      if (data) {
        this.allFiles = data;
        this.arreglarArray();
        this.pagesFiles = this.allFiles.totalPages;
        this.num_files = data.totalElements;
        this.firstFiles = data.first;
        this.lastFiles = data.last;
        if (data.totalElements < 10) {
          this.sizeFiles = data.totalElements;
        }
      }

    });
  }


  paginaSiguienteFiles(paginaActualFiles: number) {
    this.api.getAllFilesAdmin(paginaActualFiles).subscribe(data => {
      this.allFiles = data;
      this.arreglarArray();
      this.pagesFiles = this.allFiles.totalPages;
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
    this.api.getAllFilesAdmin(paginaActualFiles - 2).subscribe(data => {
      this.allFiles = data;
      this.arreglarArray();
      this.pagesFiles = this.allFiles.totalPages;
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

  aceptarArchivo(id: number) {
    this.api.aceptarArchivo(id).subscribe(data => {
    });
    window.location.reload();
  }

  rechazarArchivo(id: number) {
    this.api.rechazarArchivo(id).subscribe(data => {
    });
    window.location.reload();
  }

  descargarArchivo(fileID: number, name:string) {
    this.api.getFile(fileID).subscribe(data => {
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = name;
      link.click();

    })
  }

}
