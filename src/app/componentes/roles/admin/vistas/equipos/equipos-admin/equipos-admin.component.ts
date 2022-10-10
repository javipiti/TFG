import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { allEquiposAdminI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-equipos-admin',
  templateUrl: './equipos-admin.component.html',
  styleUrls: ['./equipos-admin.component.css']
})
export class EquiposAdminComponent implements OnInit {

  
  equipos:allEquiposAdminI;

  pages:number = 0;
  page:number = 1;
  size:number = 10;
  num_equipos:number = 0;
  first:boolean=false;
  last:boolean=false;

  page_size: number = 10;
  page_number: number = 1;

  hayInfo:boolean= true;

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.getAllEquipos();
  }

  arreglarArray() {

    for (var i = 0; i < this.equipos.content.length; i++) {
      this.equipos.content[i].inspection_date = this.equipos.content[i].inspection_date.slice(0, 10);
      this.equipos.content[i].acquisition_date = this.equipos.content[i].acquisition_date.slice(0, 10);
    }
  }



  getAllEquipos(){
    this.api.getAllAplicationEquipements(0).subscribe(data =>{
     if(data){
        this.equipos=data;
        this.arreglarArray();
        this.pages= this.equipos.totalPages;
        this.num_equipos = data.totalElements;
        this.first=data.first;
        this.last=data.last;
        if(data.totalElements<10){
          this.size = data.totalElements;
        }
      }else{
        this.hayInfo = false;
      }
    });
  }

  paginaSiguiente(paginaActual:number){
    this.api.getAllAplicationEquipements(paginaActual).subscribe(data => {
      this.equipos = data;
      this.arreglarArray();
      this.pages= this.equipos.totalPages;
      this.num_equipos = data.totalElements;
      this.first=data.first;
      this.last=data.last;
      this.page= this.page+1;
      if (data.last) {
        if (data.totalElements % 10 == 0) {
          this.size = 10;
        } else {
          this.size = data.totalElements % 10;
        }
      }else{
        if(data.totalElements>10){
          this.size=10;
        }else{
          this.size = data.totalElements % 10;
        }
      }
      
    });
  }
  paginaAnterior(paginaActual:number){
    this.api.getAllAplicationEquipements(paginaActual-2).subscribe(data => {
      this.equipos = data;
      this.arreglarArray();
      this.pages= this.equipos.totalPages;
      this.num_equipos = data.totalElements;
      this.first=data.first;
      this.last=data.last;
      this.page= this.page-1;

      if(data.last){
        this.size = data.totalElements % 10;
      }else{
        if(data.totalElements>10){
          this.size=10;
        }else{
          this.size = data.totalElements % 10;
        }
      }
    });
  }  

}
