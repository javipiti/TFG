import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { accionFitosanitariaI } from 'src/app/utils/interfaces/peticiones.component';

@Component({
  selector: 'app-add-accion-fitosanitaria',
  templateUrl: './add-accion-fitosanitaria.component.html',
  styleUrls: ['./add-accion-fitosanitaria.component.css']
})
export class AddAccionFitosanitariaComponent implements OnInit {

  farmID:number;
  invalido:boolean;
  error_farmID:string;
  mensaje:string;

  accionForm = new FormGroup({
    date: new FormControl('', Validators.required),
    treated_surface: new FormControl('', Validators.required),
    advisory_order: new FormControl(null, Validators.required),
    plague: new FormControl('', Validators.required),
    control_measures: new FormControl('', Validators.required),
    applicator: new FormControl('', Validators.required),
    efectiveness: new FormControl(0, Validators.required),
    technique: new FormControl(0, Validators.required)
  });
  
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    
  }

  addAccion(accionForm: accionFitosanitariaI) {
    if(this.accionForm.valid){
      if(this.farmID > 0){
        this.api.postPhytosanitary(this.farmID, accionForm).subscribe(data => {
          this.mensaje = "Acción fitosanitaria añadida con éxito. "
        }, err => {
          this.error_farmID = "El ID es incorrecto."
        })
      }else{
        this.error_farmID = "El ID tiene que ser mayor que 0."
      }
      
    }else{
      this.invalido = true;
    }
  }

  reset(){
    this.farmID = 0;
    this.invalido = false;
    this.accionForm.reset();
    this.error_farmID = "";
    this.mensaje = "";
  }

  get date() { return this.accionForm.get('date') };
  get treated_surface() { return this.accionForm.get('treated_surface') };
  get advisory_order() { return this.accionForm.get('advisory_order') };
  get plague() { return this.accionForm.get('plague') };
  get control_measures() { return this.accionForm.get('control_measures') };
  get applicator() { return this.accionForm.get('applicator') };
  get efectiveness() { return this.accionForm.get('efectiveness') };
  get technique() { return this.accionForm.get('technique') };

}
