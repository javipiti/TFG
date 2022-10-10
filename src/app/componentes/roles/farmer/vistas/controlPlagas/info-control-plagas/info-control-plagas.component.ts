import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { pesteIR } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-info-control-plagas',
  templateUrl: './info-control-plagas.component.html',
  styleUrls: ['./info-control-plagas.component.css']
})
export class InfoControlPlagasComponent implements OnInit {

  id:any;
  explotacionID:any;

  control:pesteIR = {
    id:0,
    advice_system: '',
    entity_name: '',
    entity_operator_id: ''
  };
  
  constructor(private api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.explotacionID = this.router.snapshot.paramMap.get('explotacionID');
    this.getControl();
  }

  getControl(){
    this.api.getControl(this.id).subscribe(data =>{
      this.control = data;
    });
  }

  reset(){
    this.getControl();
  }

  updateControl(){
    this.api.updateControl(this.control).subscribe(data =>{
      this.getControl();
    })
  }

}
