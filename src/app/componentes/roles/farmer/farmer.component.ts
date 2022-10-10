import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { cosechaI, farmI, plotIdentificationI } from 'src/app/utils/interfaces/peticiones.component';
import { getFarmsI, contentFarmI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent implements OnInit {

  
  farms: getFarmsI;
  contentFarm: contentFarmI[];


  farm: contentFarmI;
  actualizarFarm: contentFarmI = { id: 0, farm_type: '' };

  farmID: number;
  farm_type: string;

  sigpac: number;

  findFarm: boolean = false;
  pulsado: boolean = false;

  

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }



  /*
  getFarm2(id:number){
    this.api.getFarm(id).subscribe({
      complete: () => { console.log('complete'); console.log('aaaa');
       }, // completeHandler
      error: (e) => { console.log(e);console.log('bbbbb');
       },    // errorHandler 
      next: (v) => { console.log(v); console.log('ccccc');
       },     // nextHandler
    })
  }
  */

}
