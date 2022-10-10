import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { representantesI, getFarmsI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-pedir-representacion',
  templateUrl: './pedir-representacion.component.html',
  styleUrls: ['./pedir-representacion.component.css']
})
export class PedirRepresentacionComponent implements OnInit {

 
  representantes:representantesI[];

  farms:getFarmsI;

  mensaje: string;
  exito: string;
  error:string;

  farmID:number = 0;
  representanteID:number = 0;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getRepresentantes();
  }

  getRepresentantes(){
    this.api.getRepresentantes().subscribe(data => {
      if(!data){
        this.mensaje= "No hay representantes disponibles."
      }
      this.representantes=data;      
    });
  }

  solicitarRepresentacion() {
    this.api.postRepresentacion(this.farmID,this.representanteID).subscribe(data => {
      this.exito = data.info;
      this.error = "";
    }, error => {
      this.error = "Su solicitud no ha sido llevada a cabo. Asegurese de que el ID de la explotación es correcto.";
      this.exito = "";
    })
    
  }

  asignarID(representanteID:number){
    this.representanteID = representanteID;
  }

}
