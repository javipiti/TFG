import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { sigpacRI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-consultar-sigpacs',
  templateUrl: './consultar-sigpacs.component.html',
  styleUrls: ['./consultar-sigpacs.component.css']
})
export class ConsultarSigpacsComponent implements OnInit {

  SIGPACS: sigpacRI[];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAllSIGPAC();
  }


  getAllSIGPAC() {
    this.api.getAllSIGPAC().subscribe(data => {
      this.SIGPACS = data;
    });
  }

}
