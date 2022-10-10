import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { userRI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  user: userRI = {
    id: 0, keepLogged: false, role: { id: 0, role_type: '', name: '' },
    nif: '', name: '', surname: '', email: '', password: '', NIF: '', phone: 0, address: '', postal_code: 0, province: '', state: '', country: '', creation_date: '',
    validation_status: ''
  };;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    //lo inicializo para que no de errores de undefined
    this.getUser();
  }

  getUser() {
    this.api.getUser().subscribe(data => {
      this.user = data;
    });
  }

}
