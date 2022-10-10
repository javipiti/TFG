import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { analisisI } from 'src/app/utils/interfaces/peticiones.component';

@Component({
  selector: 'app-add-analisis',
  templateUrl: './add-analisis.component.html',
  styleUrls: ['./add-analisis.component.css']
})
export class AddAnalisisComponent implements OnInit {

  farmID: number;
  invalido: boolean;
  error_farmID: string;
  mensaje: string;


  analisisForm = new FormGroup({
    date: new FormControl('', Validators.required),
    analysis_type: new FormControl('', Validators.required),
    place: new FormControl('', Validators.required),
    laboratory: new FormControl('', Validators.required)
  });

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  addAnalisis(analisisForm: analisisI) {
    if (this.analisisForm.valid) {
      if (this.farmID > 0) {
        this.api.postAnalysis(this.farmID, analisisForm).subscribe(data => {
          this.mensaje = "Análisis añadido con éxito. "
        }, err => {
          this.error_farmID = "El ID es incorrecto."
        })
      } else {
        this.error_farmID = "El ID tiene que ser mayor que 0."
      }
    } else {
      this.invalido = true;
    }
  }

  reset() {
    this.farmID = 0;
    this.invalido = false;
    this.analisisForm.reset();
    this.error_farmID = "";
    this.mensaje = "";
  }

  get date() { return this.analisisForm.get('date') };
  get analysis_type() { return this.analisisForm.get('analysis_type') };
  get place() { return this.analisisForm.get('place') };
  get laboratory() { return this.analisisForm.get('laboratory') };

}
