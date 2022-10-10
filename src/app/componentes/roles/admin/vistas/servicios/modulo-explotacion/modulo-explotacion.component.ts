import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { userServiceStatusI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-modulo-explotacion',
  templateUrl: './modulo-explotacion.component.html',
  styleUrls: ['./modulo-explotacion.component.css']
})
export class ModuloExplotacionComponent implements OnInit {

  
  checkExplotacion: userServiceStatusI= {
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
  mostrarMensaje:boolean;
  mensaje:string;

  constructor(private api:ApiService, private router:Router) {}

  ngOnInit(): void {
    this.checkExplotacionServiceStatus();
    this.mostrarMensaje=false;
    this.mensaje='';
  }

  checkExplotacionServiceStatus() {
    this.api.checkExplotacionServiceStatus().subscribe(data => {
      this.checkExplotacion = data;      
    });
  }

  restartExplotacionService() {
    this.api.restartExplotacionService().subscribe(data => {
      this.mostrarMensaje=true;
      this.mensaje='Servicio reiniciado con éxito.';
    });
  }

}
