import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { userServiceStatusI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-modulo-usuarios',
  templateUrl: './modulo-usuarios.component.html',
  styleUrls: ['./modulo-usuarios.component.css']
})
export class ModuloUsuariosComponent implements OnInit {

  
  checkUser: userServiceStatusI = {
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
        components: {
          firstRabbitTemplate: {
            status: '',
            details: {
              version: '',
            }
          },
          rabbitTemplate: {
            status: '',
            details: {
              version: ''
            }
          }
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
    this.checkUserServiceStatus();
    this.mostrarMensaje = false;
    this.mensaje = '';
  }

  checkUserServiceStatus() {
    this.api.checkUserServiceStatus().subscribe(data => {
      this.checkUser = data;
    });
  }

  restartUserService() {
    this.api.restartUserService().subscribe(data => {
      this.mostrarMensaje = true;
      this.mensaje = 'Servicio reiniciado con éxito.';
    });
  }

}
