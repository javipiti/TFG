import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { cosechaI } from 'src/app/utils/interfaces/peticiones.component';

@Component({
  selector: 'app-add-cosecha',
  templateUrl: './add-cosecha.component.html',
  styleUrls: ['./add-cosecha.component.css']
})
export class AddCosechaComponent implements OnInit {

  farmID:number;
  invalido:boolean;
  error_farmID:string;
  mensaje:string;

  cosechaForm = new FormGroup({
    date: new FormControl('', Validators.required),
    vegetable_product: new FormControl('', Validators.required),
    batch_number: new FormControl(0, Validators.required),
    destination: new FormControl('', Validators.required),
    NIF_client: new FormControl('', Validators.required)
  });
  
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    
  }

  addCosecha(cosechaForm: cosechaI) {
    if(this.cosechaForm.valid){
      if(this.farmID > 0){
        this.api.postHarvest(this.farmID, cosechaForm).subscribe(data => {
          this.mensaje = "Cosecha añadida con éxito. "
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
    this.cosechaForm.reset();
    this.error_farmID = "";
    this.mensaje = "";
  }

  get date() { return this.cosechaForm.get('date') };
  get vegetable_product() { return this.cosechaForm.get('vegetable_product') };
  get batch_number() { return this.cosechaForm.get('batch_number') };
  get destination() { return this.cosechaForm.get('destination') };
  get NIF_client() { return this.cosechaForm.get('NIF_client') };

}
