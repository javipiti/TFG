import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { respuestaGerenerica, validarCorreoE, verificacionI, getFilesI, contentI, userRI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


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

  validacion: respuestaGerenerica;
  validacionE: validarCorreoE;
  verificacion: verificacionI = {
    counter: 0,
    description: '',
    display: false,
    eventType: '',
    id: 0,
    userId: ''
  };

  validarTokenCorreo: string;



  fileName = '';
  file: File;

  //Esto es para los mensajes, la notificacion no se actualiza cuando se sube un fichero tipo IDCARD
  archivos: getFilesI;
  getContent: contentI;



  constructor(private api: ApiService, private router: Router) { }

  onFileSelected(event: any) {
    if (event.target.files[0]) {
      this.file = event.target.files[0];
      this.fileName = this.file.name;
    }

  }

  subirArchivo() {
    if (this.file) {
      this.api.uploadVerificacion(this.user.id, this.file).subscribe(data => {
        window.location.reload();
      });
    }
  }

  ngOnInit(): void {
    this.getUser();
    
  }

  getUser() {
    this.api.getUser().subscribe(data => {
      this.user = data;
      this.getVerificacion();
      this.comprobarArchivos();
    });
  }

  comprobarArchivos() {
    this.api.getAllFilesUser(this.user.id, 0).subscribe(data => {
      if (data) {
        this.archivos = data;
        this.getContent = this.archivos.content[0]; //el usuario solo podrá subir un archivo asi que siempre será el 0
      }
    });
  }

  validarCorreo() {
    this.api.validarCorreo(this.validarTokenCorreo).subscribe(data => {
      this.validacion = data;
      this.reset();
    }, err => {
      this.validacionE = err;
    })
  }

  deleteCuenta() {
    this.api.deleteUser().subscribe(data => {
      localStorage.clear();
      this.router.navigate(['login']);
    }, err => {
    })
  }


  reset() {
    this.getUser();
  }

  updateUser() {
    this.api.putUser(this.user).subscribe(data => {
    }, err => {
    });
  }



  getVerificacion() {
    if (this.user.role.role_type == 'guest') {      
      this.api.getNotificaciones().subscribe(data => {        
        this.verificacion = data[0];
      });
    }
  }

}
