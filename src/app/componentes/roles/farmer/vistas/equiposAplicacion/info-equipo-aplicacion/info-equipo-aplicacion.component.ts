import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { equipmentIR } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-info-equipo-aplicacion',
  templateUrl: './info-equipo-aplicacion.component.html',
  styleUrls: ['./info-equipo-aplicacion.component.css']
})
export class InfoEquipoAplicacionComponent implements OnInit {

  id: any;
  explotacionID: any;

  equipo: equipmentIR = {
    id: 0,
    roma: 0,
    equipment_number: 0,
    description: '',
    ROMA: 0,
    acquisition_date: '',
    inspection_date: ''
  };

  constructor(private api: ApiService, private router: ActivatedRoute) { }

  arreglarArray() {
    if (this.equipo.acquisition_date)
      this.equipo.acquisition_date = this.equipo.acquisition_date.slice(0, 10);
    if (this.equipo.inspection_date)
      this.equipo.inspection_date = this.equipo.inspection_date.slice(0, 10);
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.explotacionID = this.router.snapshot.paramMap.get('explotacionID');
    this.getEquipo();
  }

  reset() {
    this.getEquipo();
  }
  getEquipo() {
    this.api.getEquipment(this.id).subscribe(data => {
      this.equipo = data;
      this.arreglarArray();
    });
  }
  updateEquipo() {
    this.api.updateEquipment(this.equipo).subscribe(data => {
      this.getEquipo();
    })
  }
}
