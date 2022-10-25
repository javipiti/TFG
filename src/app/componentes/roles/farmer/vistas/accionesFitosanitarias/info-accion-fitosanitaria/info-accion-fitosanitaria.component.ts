import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { accionFitosanitariaIR } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-info-accion-fitosanitaria',
  templateUrl: './info-accion-fitosanitaria.component.html',
  styleUrls: ['./info-accion-fitosanitaria.component.css']
})
export class InfoAccionFitosanitariaComponent implements OnInit {

  id: any;
  explotacionID: any;

  treated_surface: string;
  order: string;

  accion: accionFitosanitariaIR = {
    advisory_order: false,
    applicator: '',
    control_measures: '',
    date: '',
    efectiveness: 0,
    farmId: { id: 0, farm_type: '', },
    id: 0,
    plague: '',
    technique: 0,
    treated_surface: '',
  };

  constructor(private api: ApiService, private router: ActivatedRoute) { }

  arreglarArray() {
    if (this.accion.date)
      this.accion.date = this.accion.date.slice(0, 10);
      
    switch (this.accion.treated_surface) {
      case ('P'):
        this.treated_surface = "Parcial";
        break;
      case ('T'):
        this.treated_surface = "Total";
        break;
      case ('F'):
        this.treated_surface = "Parcial";
        break;
      default:
        this.treated_surface = "";
        break;
    }

    switch (this.accion.advisory_order) {
      case (true):
        this.order = "Sí";
        break;
      case (false):
        this.order = "No";
        break;
      default:
        this.order = "";
        break;
    }
  }

  reset() {
    this.getAccion();
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.explotacionID = this.router.snapshot.paramMap.get('explotacionID');
    this.getAccion();
  }

  getAccion() {
    this.api.getPhytosanitary(this.id).subscribe(data => {
      this.accion = data;
      this.arreglarArray();
    });
  }

  updateAccion() {
    this.api.updatePhytosanitary(this.accion).subscribe(data => {
      this.getAccion();
    })
  }

}
