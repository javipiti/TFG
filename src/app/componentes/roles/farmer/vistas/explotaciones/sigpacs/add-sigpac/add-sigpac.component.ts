import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { sigpacCompletoI } from 'src/app/utils/interfaces/peticiones.component';

@Component({
  selector: 'app-add-sigpac',
  templateUrl: './add-sigpac.component.html',
  styleUrls: ['./add-sigpac.component.css']
})
export class AddSigpacComponent implements OnInit {

  sigpacForm = new FormGroup({
    province: new FormControl('', Validators.required),
    municipality: new FormControl('', Validators.required),
    zone: new FormControl('', Validators.required),
    polygon: new FormControl('', Validators.required),
    enclosure: new FormControl('', Validators.required),
    SIGPAC_use: new FormControl('', Validators.required),
  });

  mensaje: string;
  invalido: boolean;


  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {

  }

  addSIGPAC(sigpacForm: sigpacCompletoI) {
    if (this.sigpacForm.valid) {
      this.api.postSIGPAC(sigpacForm).subscribe(data => {
        this.mensaje = "SIGPAC añadido con éxito. "
      });
    } else {
      this.invalido = true;
    }
  }

  reset() {
    this.invalido = false;
    this.sigpacForm.reset();
    this.mensaje = "";
  }

  get province() { return this.sigpacForm.get('province') };
  get municipality() { return this.sigpacForm.get('municipality') };
  get zone() { return this.sigpacForm.get('zone') };
  get polygon() { return this.sigpacForm.get('polygon') };
  get enclosure() { return this.sigpacForm.get('enclosure') };
  get SIGPAC_use() { return this.sigpacForm.get('SIGPAC_use') };


}
