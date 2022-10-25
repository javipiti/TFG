import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginComponent } from 'src/app/componentes/login_registro/login/login.component';
import { ApiService } from 'src/app/servicios/api.service';
import { plotIdentificationI } from 'src/app/utils/interfaces/peticiones.component';

@Component({
  selector: 'app-add-info-explotacion',
  templateUrl: './add-info-explotacion.component.html',
  styleUrls: ['./add-info-explotacion.component.css']
})
export class AddInfoExplotacionComponent implements OnInit {

  id: any;
  invalido:boolean;

  infoForm = new FormGroup({
    liczepa: new FormControl('', Validators.required),
    area: new FormControl(0, Validators.required),
    crop: new FormControl('', Validators.required),
    REXA_variety: new FormControl('', Validators.required),
    seedTime: new FormControl('', Validators.required),
    collectionTime: new FormControl('', Validators.required),
    SIGPAC: new FormGroup({
      id: new FormControl(0, Validators.required)
    }),
    type: new FormControl('', Validators.required),
    'open/protected': new FormControl('', Validators.required),
    integrated_system_advice: new FormControl('', Validators.required),
    entryDate: new FormControl('', Validators.required),
    dischargeDate: new FormControl('', Validators.required),
    'LIC/ZEPA': new FormControl('',),
    vulnerable_nitrate_zone: new FormControl('', Validators.required),
    'well/water intake distance': new FormControl(0, Validators.required),
    'river/reservoir distance': new FormControl(0, Validators.required),
    control_station_reference: new FormControl('', Validators.required),
    tenure_regime: new FormControl('', Validators.required)
  });

  error: string;

  constructor(private api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
  }

  addInfo(form: any) {
    if (this.infoForm.valid) {
      form['LIC/ZEPA'] = form.liczepa;
      this.api.savePlotIdentification(form, this.id).subscribe(data => {
        window.location.replace('principal/consultar-explotaciones/' + this.id);
      }, err => {
        this.error = "Se ha producido un error al añadir la identificación. Asegurese de que el SIGPAC introducido es válido."
      });
    } else {
      this.invalido = true;
    }    
  }

  get liczepa() { return this.infoForm.get('liczepa') };
  get area() { return this.infoForm.get('area') };
  get crop() { return this.infoForm.get('crop') };
  get REXA_variety() { return this.infoForm.get('REXA_variety') };
  get seedTime() { return this.infoForm.get('seedTime') };
  get collectionTime() { return this.infoForm.get('collectionTime') };
  get SIGPAC() { return this.infoForm.get('SIGPAC').get('id') };
  get type() { return this.infoForm.get('type') };
  get open() { return this.infoForm.get('open/protected') };
  get integrated_system_advice() { return this.infoForm.get('integrated_system_advice') };
  get entryDate() { return this.infoForm.get('entryDate') };
  get dischargeDate() { return this.infoForm.get('dischargeDate') };
  get vulnerable_nitrate_zone() { return this.infoForm.get('vulnerable_nitrate_zone') };
  get water() { return this.infoForm.get('well/water intake distance') };
  get river() { return this.infoForm.get('river/reservoir distance') };
  get control_station_reference() { return this.infoForm.get('control_station_reference') };
  get tenure_regime() { return this.infoForm.get('tenure_regime') };

}
