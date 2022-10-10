import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { advisorIR } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-info-asesor',
  templateUrl: './info-asesor.component.html',
  styleUrls: ['./info-asesor.component.css']
})
export class InfoAsesorComponent implements OnInit {

  id:any;

  asesor:advisorIR = {
    id: 0,
    name: '',
    surname: '',
    admission_date: '',
    discharge_date: '',
    creation_date: '',
    license_type: ''
  };
  
  constructor(private api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.getAsesor();
  }

  getAsesor(){
    this.api.getAdvisorInfo(this.id).subscribe(data =>{
      this.asesor = data;
    });
  }

}
