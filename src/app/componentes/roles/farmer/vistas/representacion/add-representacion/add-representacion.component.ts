import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { representanteI } from 'src/app/utils/interfaces/peticiones.component';

@Component({
  selector: 'app-add-representacion',
  templateUrl: './add-representacion.component.html',
  styleUrls: ['./add-representacion.component.css']
})
export class AddRepresentacionComponent implements OnInit {

  representanteForm = new FormGroup({
    NIF: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{8}[a-zA-Z]$")]),
    Autonomous_farm_register: new FormControl('', Validators.required),
    National_farm_register: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
  });

  mensaje: string;
  invalido: boolean;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  addRepresentante(representanteForm: representanteI) {
    if (this.representanteForm.valid) {
      this.api.postRepresentante(representanteForm).subscribe(data => {
        this.mensaje = "Representante añadido con éxito. "
      });
    } else {
      this.invalido = true;
    }
  }

  reset() {
    this.invalido = false;
    this.representanteForm.reset();
    this.mensaje = "";
  }

  get NIF() { return this.representanteForm.get('NIF') };
  get Autonomous_farm_register() { return this.representanteForm.get('Autonomous_farm_register') };
  get National_farm_register() { return this.representanteForm.get('National_farm_register') };
  get Email() { return this.representanteForm.get('Email') };

}
