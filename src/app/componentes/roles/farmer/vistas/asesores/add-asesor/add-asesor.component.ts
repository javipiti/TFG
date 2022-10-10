import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { asesorI } from 'src/app/utils/interfaces/peticiones.component';

@Component({
  selector: 'app-add-asesor',
  templateUrl: './add-asesor.component.html',
  styleUrls: ['./add-asesor.component.css']
})
export class AddAsesorComponent implements OnInit {

  farmID:number = 0;
  invalido:boolean;
  error_farmID:string;
  mensaje:string;


  asesorForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    admission_date: new FormControl('', Validators.required),
    discharge_date: new FormControl('', Validators.required),
    creation_date: new FormControl('', Validators.required),
    license_type: new FormControl('', Validators.required)
  });
  
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    
  }

  addAsesor(asesorForm: asesorI) {
    if(this.asesorForm.valid){
      if(this.farmID > 0){
        this.api.postAdvisor(this.farmID, asesorForm).subscribe(data => {
          this.mensaje = "Asesor añadido con éxito. "
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
    this.asesorForm.reset();
    this.error_farmID = "";
    this.mensaje = "";
  }

  get name() { return this.asesorForm.get('name') };
  get surname() { return this.asesorForm.get('surname') };
  get admission_date() { return this.asesorForm.get('admission_date') };
  get discharge_date() { return this.asesorForm.get('discharge_date') };
  get creation_date() { return this.asesorForm.get('creation_date') };
  get license_type() { return this.asesorForm.get('license_type') };
}
