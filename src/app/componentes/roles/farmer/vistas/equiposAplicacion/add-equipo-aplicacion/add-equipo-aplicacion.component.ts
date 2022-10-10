import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { equipmentIR } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-add-equipo-aplicacion',
  templateUrl: './add-equipo-aplicacion.component.html',
  styleUrls: ['./add-equipo-aplicacion.component.css']
})
export class AddEquipoAplicacionComponent implements OnInit {

  farmID:number;
  invalido:boolean;
  error_farmID:string;
  mensaje:string;


  equipoForm = new FormGroup({
    equipment_number: new FormControl(0, Validators.required),
    description: new FormControl('', Validators.required),
    ROMA: new FormControl(null, Validators.required),
    acquisition_date: new FormControl('', Validators.required),
    inspection_date: new FormControl('', Validators.required)
  });
  
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    
  }

  addEquipo(equipoForm: any) {
    if(this.equipoForm.valid){
      if(this.farmID > 0){
        this.api.postEquipment(this.farmID, equipoForm).subscribe(data => {
          this.mensaje = "Equipo añadido con éxito. "
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
    this.equipoForm.reset();
    this.error_farmID = "";
    this.mensaje = "";
  }

  get equipment_number() { return this.equipoForm.get('equipment_number') };
  get description() { return this.equipoForm.get('description') };
  get ROMA() { return this.equipoForm.get('ROMA') };
  get acquisition_date() { return this.equipoForm.get('acquisition_date') };
  get inspection_date() { return this.equipoForm.get('inspection_date') };
}
