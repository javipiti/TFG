import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { visitaI } from 'src/app/utils/interfaces/peticiones.component';

@Component({
  selector: 'app-add-visita',
  templateUrl: './add-visita.component.html',
  styleUrls: ['./add-visita.component.css']
})
export class AddVisitaComponent implements OnInit {

  asesorID:number = 0;

  visitaForm = new FormGroup({
    date: new FormControl('', Validators.required)
  });
  
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    
  }

  addVisita(visitaForm: visitaI) {
    this.api.postVisit(this.asesorID, visitaForm).subscribe(data => {      
    })
  }

}
