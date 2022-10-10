import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { notificacionI, peticionRepresentacionI, userRI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {


  notificaciones: notificacionI[];
  solicitudes: peticionRepresentacionI[];


  user: userRI = {
    id: 0, keepLogged: false, role: { id: 0, role_type: '', name: '' },
    nif: '', name: '', surname: '', email: '', password: '', NIF: '', phone: 0, address: '', postal_code: 0, province: '', state: '', country: '', creation_date: '',
    validation_status: ''
  };

  haySolicitudes: boolean = true;
  hay:boolean = false;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
    this.getNotificaciones();
  }

  getUser() {
    this.api.getUser().subscribe(data => {
      this.user = data;
      if (this.user.role.role_type == 'farm_representative') {
        this.getPeticionesRepresentacion();
      }
    });

  }

  getNotificaciones() {
    this.api.getNotificaciones().subscribe(data => {
      if(data){
        this.notificaciones = data;
        this.hay = true;
      }else{
        this.hay = false;
      }
    });
  }

  getPeticionesRepresentacion() {
    this.api.getPeticionesRepresentacion().subscribe(data => {      
      this.haySolicitudes = true;
      this.solicitudes = data;
      this.dividirFecha();
      if (data.length == 0) {
        this.haySolicitudes = false;
      }
    });
  }

  dividirFecha() {
    for (var i = 0; i < this.solicitudes.length; i++) {
      this.solicitudes[i].requestDate = this.solicitudes[i].requestDate.slice(0, 10);
      if (this.solicitudes[i].responseDate != null) {
        this.solicitudes[i].responseDate = this.solicitudes[i].responseDate.slice(0, 10);
      }
    }
  }

  aceptarPeticionRepresentacion(representacionID: number) {
    this.api.aceptarPeticionRepresentacion(representacionID).subscribe(data => {
      this.getPeticionesRepresentacion();
    });
  }

  rechazarPeticionRepresentacion(representacionID: number) {
    this.api.rechazarPeticionRepresentacion(representacionID).subscribe(data => {
      this.getPeticionesRepresentacion();
    });
  }

  limpiarNotificaciones() {
    enum type {
      "REMAINING_VERIFICATION_DOCUMENTS",
      "VERIFICATION_DOCUMENT_UPDATED",
      "EXPIRED_FILE",
      "FILE_ABOUT_TO_EXPIRE"
    };

    this.api.cleanNotifications(type.VERIFICATION_DOCUMENT_UPDATED).subscribe(data => {
    })
    this.api.cleanNotifications(type.EXPIRED_FILE).subscribe(data => {
    })
    this.api.cleanNotifications(type.FILE_ABOUT_TO_EXPIRE).subscribe(data => {
    });

    window.location.reload();

  }

}
