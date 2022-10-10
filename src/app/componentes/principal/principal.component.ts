import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { AuthService } from 'src/app/servicios/auth-service.service';
import { farmI, plotIdentificationI, representanteI, sigpacCompletoI } from 'src/app/utils/interfaces/peticiones.component';
import { plotIdentificationRI, userRI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {


  user: userRI = {
    id: 0, keepLogged: false, role: { id: 0, role_type: '', name: '' },
    nif: '', name: '', surname: '', email: '', password: '', NIF: '', phone: 0, address: '', postal_code: 0, province: '', state: '', country: '', creation_date: '',
    validation_status: ''
  };
  farm: farmI = { farm_type: '' };
  plotid: plotIdentificationI;
  plotIDR: plotIdentificationRI;
  sigpac: sigpacCompletoI;
  representante: representanteI;



  constructor(private api: ApiService, private autorizacion: AuthService) { }

  ngOnInit(): void {
    //lo inicializo para que no de errores de undefined
    this.getUser();

  }

  getUser() {
    this.api.getUser().subscribe(data => {
      this.user = data;
      this.autorizacion.login(data.role.role_type);

    });
  }
}
