import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { farmI } from 'src/app/utils/interfaces/peticiones.component';

@Component({
  selector: 'app-add-explotacion',
  templateUrl: './add-explotacion.component.html',
  styleUrls: ['./add-explotacion.component.css']
})
export class AddExplotacionComponent implements OnInit {

  mensaje: string;

  addFarm = new FormGroup({
    farm_type: new FormControl('', Validators.required)
  })

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  addExplotacion(farm:farmI) {
    if(farm.farm_type){
      this.api.addExplotacion(farm).subscribe(data => {
        this.mensaje = "Se ha añadido la explotación con éxito."
      });
    }
    
  }

  reset(){
    this.mensaje = "";
    this.addFarm.reset();
  }
}
