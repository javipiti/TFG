import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { userRI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: userRI  = {
    id: 0, keepLogged: false, role: { id: 0, role_type: '', name: '' },
    nif: '', name: '', surname: '', email: '', password: '', NIF: '', phone: 0, address: '', postal_code: 0, province: '', state: '', country: '', creation_date: '',
    validation_status: ''
  };;
  
  constructor(private api:ApiService, private router:Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.api.getUser().subscribe(data => {
      this.user = data;
    });
  }

}
