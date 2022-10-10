import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { loginI } from 'src/app/utils/interfaces/peticiones.component';
import { tokenRI } from 'src/app/utils/interfaces/respuestas.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  loginForm = new FormGroup({
    identifier: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    keepLogged: new FormControl(true, Validators.required)
  })

  keepLogged:boolean=true;
  errorLogin : boolean = false;
  errorMensaje:string = "";

  constructor(private api:ApiService, private router:Router) { 
  }

  ngOnInit(): void {
    this.checkToken();//Si existe el token redirecciono a la pagina principal
  }


  mantenerSesion(event: any){
    if (event.target.checked) {
      this.keepLogged = true;
    }else{
      this.keepLogged = false;
    }
  }

  checkToken(){
    if(localStorage.getItem('token')){
      this.router.navigate(['principal']);
    }
  }

  onLogin(form: loginI){
    this.api.login(form).subscribe(data =>{
      let dataResponse:tokenRI = data;
      if(dataResponse.token != null){
        localStorage.setItem("token", dataResponse.token);
        if(dataResponse.refreshToken !=null){
          localStorage.setItem("refreshToken", dataResponse.refreshToken);
        }
        this.router.navigate(['principal']);
      }
    },error => { //si la llamada al post vuelve con error
      let dataResponse:tokenRI = error;
      if(dataResponse.status != '200'){
        this.errorLogin = true;
        this.errorMensaje = "Credenciales incorrectas";
      }
    })
    
  }

}
