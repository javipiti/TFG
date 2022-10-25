import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { analisisIR } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-infoanalisis',
  templateUrl: './infoanalisis.component.html',
  styleUrls: ['./infoanalisis.component.css']
})
export class InfoanalisisComponent implements OnInit {

  id: any;
  tipo: string;
  lugar: string;

  explotacionID: any;

  analisis: analisisIR = {
    id: 0,
    date: '',
    analysis_type: '',
    place: '',
    laboratory: '',
  };

  constructor(private api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.explotacionID = this.router.snapshot.paramMap.get('explotacionID');
    this.getAnalisis();
  }

  reset() {
    this.getAnalisis();
  }

  arreglarArray() {
    if (this.analisis.date)
      this.analisis.date = this.analisis.date.slice(0, 10);

    switch (this.analisis.analysis_type) {
      case ('WATER'):
        this.tipo = "Agua";
        break;
      case ('VEGETABLE'):
        this.tipo = "Vegetal";
        break;
      case ('SOIL'):
        this.tipo = "Suelo";
        break;
      default:
        this.tipo = "";
        break;
    }

    switch (this.analisis.place) {
      case ('PLOT'):
        this.lugar = "Parcela";
        break;
      case ('SAMPLED_BATCH'):
        this.lugar = "Lote de muestra";
        break;
      default:
        this.lugar = "";
        break;
    }
  }
  getAnalisis() {
    this.api.getAnalysis(this.id).subscribe(data => {
      this.analisis = data;
      this.arreglarArray();
    });
  }
  updateAnalisis() {
    this.api.updateAnalysis(this.analisis).subscribe(data => {
      this.getAnalisis();
    })
  }

}
