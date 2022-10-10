import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { userNotificacionStatusI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-modulo-notificaciones',
  templateUrl: './modulo-notificaciones.component.html',
  styleUrls: ['./modulo-notificaciones.component.css']
})
export class ModuloNotificacionesComponent implements OnInit {

  
  checkNotificacion: userNotificacionStatusI = {
    status: '',
    components: {
      clientConfigServer: {
        status: '',
        details: {
          propertySources: ['', '']
        },
      },
      db: {
        status: '',
        details: {
          database: '',
          validationQuery: ''
        }
      },
      discoveryComposite: {
        description: '',
        status: '',
        components: {
          discoveryClient: {
            description: '',
            status: ''
          }
        }
      },
      diskSpace: {
        status: '',
        details: {
          total: 0,
          free: 0,
          threshold: 0,
          exists: false
        }
      },
      mail: {
        status: '',
        details: {
          location: ''
        },
      },
      ping: {
        status: ''
      },
      rabbit: {
        status: '',
        details: {
          version: '',
        }
      },
      refreshScope: {
        status: ''
      },
    }
  };

  mostrarMensaje: boolean;
  mensaje: string;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.checkNotificacionServiceStatus();
    this.mostrarMensaje = false;
    this.mensaje = '';
  }

  checkNotificacionServiceStatus() {
    this.api.checkNotificacionServiceStatus().subscribe(data => {
      this.checkNotificacion = data;
    });
  }

  restartNotificacionService() {
    this.api.restartNotificacionService().subscribe(data => {
      this.mostrarMensaje = true;
      this.mensaje = 'Servicio reiniciado con éxito.';
    });
  }

}
