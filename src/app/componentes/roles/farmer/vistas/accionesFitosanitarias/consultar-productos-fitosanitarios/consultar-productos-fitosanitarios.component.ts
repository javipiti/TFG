import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-consultar-productos-fitosanitarios',
  templateUrl: './consultar-productos-fitosanitarios.component.html',
  styleUrls: ['./consultar-productos-fitosanitarios.component.css']
})
export class ConsultarProductosFitosanitariosComponent implements OnInit {

  
  id: any;
  explotacionID:any;

  productos:any;
  hay:boolean = false;

  constructor(private api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.explotacionID = this.router.snapshot.paramMap.get('explotacionID');
    this.getProductos();
  }

  getProductos() {
    
    this.api.getAllPhytosanitaryProducts(this.id).subscribe(data => {
      if(data){
        this.productos = data;
        this.hay = true;
      }
      
    });
    
  }

  deleteAccion(accionID:number){
    this.api.deletePhytosanitary(accionID).subscribe(data => {
      
    })
  }

}
