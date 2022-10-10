import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { registroI } from 'src/app/utils/interfaces/peticiones.component';
import { errorRI, registroRI, tokenRI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  invalido: boolean = false;
  patron = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^]){8,15}$";

  registroForm = new FormGroup({
    nif: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{8}[a-zA-Z]$")]),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.patron)]),
    phone: new FormControl(null, Validators.required),
    address: new FormControl('', Validators.required),
    postal_code: new FormControl(null, Validators.required),
    province: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('')
  });


  errorMensaje: boolean = false;
  exitoMensaje: boolean = false;
  mensaje: string = "";


  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }


  onRegistro(form: registroI) {
    this.exitoMensaje = false;
    this.errorMensaje = false;
    if (this.registroForm.valid) {

      this.api.registro(form).subscribe(data => {


        this.exitoMensaje = true;
        this.mensaje = 'Usuario registrado con éxito.';
        this.registroForm.reset();
      }, error => { //si la llamada al post vuelve con error
        let dataResponse: registroRI = error;
        let errorResponse: errorRI = dataResponse.error;

        if (dataResponse.status == '409') {
          this.errorMensaje = true;
          this.mensaje = errorResponse.info;
        }
        if (dataResponse.status == '422') {
          this.errorMensaje = true;
          this.mensaje = errorResponse.info;
        }
      })

    } else {
      this.invalido = true;
    }

  }

  get nif() { return this.registroForm.get('nif') };
  get name() { return this.registroForm.get('name') };
  get surname() { return this.registroForm.get('surname') };
  get email() { return this.registroForm.get('email') };
  get password() { return this.registroForm.get('password') };
  get phone() { return this.registroForm.get('phone') };
  get address() { return this.registroForm.get('address') };
  get postal_code() { return this.registroForm.get('postal_code') };
  get province() { return this.registroForm.get('province') };
  get country() { return this.registroForm.get('country') };
}
