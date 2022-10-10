import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { controlPlagaI } from 'src/app/utils/interfaces/peticiones.component';

@Component({
  selector: 'app-add-control-plagas',
  templateUrl: './add-control-plagas.component.html',
  styleUrls: ['./add-control-plagas.component.css']
})
export class AddControlPlagasComponent implements OnInit {

  farmID:number;
  invalido:boolean;
  error_farmID:string;
  mensaje:string;


  plagaForm = new FormGroup({
    advice_system: new FormControl('', Validators.required),
    entity_name: new FormControl('', Validators.required),
    entity_operator_id: new FormControl(null, Validators.required)
  });
  
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    
  }

  addControl(plagaForm: controlPlagaI) {

    if(this.plagaForm.valid){
      if(this.farmID > 0){
        this.api.postControl(this.farmID, plagaForm).subscribe(data => {
          this.mensaje = "Control de pestes añadido con éxito. "
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
    this.plagaForm.reset();
    this.error_farmID = "";
    this.mensaje = "";
  }

  get advice_system() { return this.plagaForm.get('advice_system') };
  get entity_name() { return this.plagaForm.get('entity_name') };
  get entity_operator_id() { return this.plagaForm.get('entity_operator_id') };

}
