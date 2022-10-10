import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { allHarvestI, harvestIR } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-info-cosecha',
  templateUrl: './info-cosecha.component.html',
  styleUrls: ['./info-cosecha.component.css']
})
export class InfoCosechaComponent implements OnInit {

  
  id:any;
  explotacionID:any;

  cosecha:harvestIR = {
    id: 0,
    date: '',
    vegetable_product: '',
    batch_number: 0,
    destination: '',
    NIF_client: ''
  };
  
  constructor(private api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.explotacionID = this.router.snapshot.paramMap.get('explotacionID');
    this.getCosecha();
  }

  getCosecha(){
    this.api.getHarvest(this.id).subscribe(data =>{
      this.cosecha = data;
      let fecha = this.cosecha.date.split("T",1);
      this.cosecha.date = fecha[0];
    });
  }

  reset(){
    this.getCosecha();
  }

  updateCosecha(){
    this.api.updateHarvest(this.cosecha).subscribe(data => {
      this.getCosecha();
    })
  }

}
