import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './utils/headers/header/header.component';
import { AdminHeaderComponent } from './utils/headers/admin-header/admin-header.component';
import { FooterComponent } from './utils/footers/footer/footer.component';
import { LoginComponent } from './componentes/login_registro/login/login.component';
import { RegistroComponent } from './componentes/login_registro/registro/registro.component';
import { PerfilComponent } from './componentes/cuenta/perfil/perfil.component';
import { ArchivosUsuarioComponent } from './componentes/cuenta/archivos-usuario/archivos-usuario.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { UsuariosComponent } from './componentes/roles/admin/vistas/usuarios/usuarios/usuarios.component';
import { ArchivosAdminComponent } from './componentes/roles/admin/vistas/usuarios/archivos-admin/archivos-admin.component';
import { ModuloExplotacionComponent } from './componentes/roles/admin/vistas/servicios/modulo-explotacion/modulo-explotacion.component';
import { ModuloNotificacionesComponent } from './componentes/roles/admin/vistas/servicios/modulo-notificaciones/modulo-notificaciones.component';
import { ModuloUsuariosComponent } from './componentes/roles/admin/vistas/servicios/modulo-usuarios/modulo-usuarios.component';
import { ExplotacionesAdminComponent } from './componentes/roles/admin/vistas/explotaciones/explotaciones-admin/explotaciones-admin.component';
import { EquiposAdminComponent } from './componentes/roles/admin/vistas/equipos/equipos-admin/equipos-admin.component';
import { CosechasAdminComponent } from './componentes/roles/admin/vistas/cosechas/cosechas-admin/cosechas-admin.component';
import { ControlPlagasAdminComponent } from './componentes/roles/admin/vistas/controlPlagas/control-plagas-admin/control-plagas-admin.component';
import { AsesoresAdminComponent } from './componentes/roles/admin/vistas/asesores/asesores-admin/asesores-admin.component';
import { AnalisisAdminComponent } from './componentes/roles/admin/vistas/analisis/analisis-admin/analisis-admin.component';
import { AccionesFitosanitariasAdminComponent } from './componentes/roles/admin/vistas/accionesFitosanitarias/acciones-fitosanitarias-admin/acciones-fitosanitarias-admin.component';
import { ConsultarExplotacionesComponent } from './componentes/roles/farmer/vistas/explotaciones/consultar-explotaciones/consultar-explotaciones.component';
import { AddExplotacionComponent } from './componentes/roles/farmer/vistas/explotaciones/add-explotacion/add-explotacion.component';
import { InfoExplotacionComponent } from './componentes/roles/farmer/vistas/explotaciones/info-explotacion/info-explotacion.component';
import { AddCosechaComponent } from './componentes/roles/farmer/vistas/cosechas/add-cosecha/add-cosecha.component';
import { ConsultarCosechasComponent } from './componentes/roles/farmer/vistas/cosechas/consultar-cosechas/consultar-cosechas.component';
import { InfoCosechaComponent } from './componentes/roles/farmer/vistas/cosechas/info-cosecha/info-cosecha.component';
import { ConsultarEquiposAplicacionComponent } from './componentes/roles/farmer/vistas/equiposAplicacion/consultar-equipos-aplicacion/consultar-equipos-aplicacion.component';
import { AddEquipoAplicacionComponent } from './componentes/roles/farmer/vistas/equiposAplicacion/add-equipo-aplicacion/add-equipo-aplicacion.component';
import { InfoEquipoAplicacionComponent } from './componentes/roles/farmer/vistas/equiposAplicacion/info-equipo-aplicacion/info-equipo-aplicacion.component';
import { ConsultarAnalisisComponent } from './componentes/roles/farmer/vistas/analisis/consultar-analisis/consultar-analisis.component';
import { AddAnalisisComponent } from './componentes/roles/farmer/vistas/analisis/add-analisis/add-analisis.component';
import { InfoanalisisComponent } from './componentes/roles/farmer/vistas/analisis/infoanalisis/infoanalisis.component';
import { ConsultarAsesoresComponent } from './componentes/roles/farmer/vistas/asesores/consultar-asesores/consultar-asesores.component';
import { AddAsesorComponent } from './componentes/roles/farmer/vistas/asesores/add-asesor/add-asesor.component';
import { InfoAsesorComponent } from './componentes/roles/farmer/vistas/asesores/info-asesor/info-asesor.component';
import { ConsultarVisitasComponent } from './componentes/roles/farmer/vistas/asesores/visitas/consultar-visitas/consultar-visitas.component';
import { AddVisitaComponent } from './componentes/roles/farmer/vistas/asesores/visitas/add-visita/add-visita.component';
import { ConsultarControlesPlagasComponent } from './componentes/roles/farmer/vistas/controlPlagas/consultar-controles-plagas/consultar-controles-plagas.component';
import { AddControlPlagasComponent } from './componentes/roles/farmer/vistas/controlPlagas/add-control-plagas/add-control-plagas.component';
import { InfoControlPlagasComponent } from './componentes/roles/farmer/vistas/controlPlagas/info-control-plagas/info-control-plagas.component';
import { AddSigpacComponent } from './componentes/roles/farmer/vistas/explotaciones/sigpacs/add-sigpac/add-sigpac.component';
import { ConsultarSigpacsComponent } from './componentes/roles/farmer/vistas/explotaciones/sigpacs/consultar-sigpacs/consultar-sigpacs.component';
import { PedirRepresentacionComponent } from './componentes/roles/farmer/vistas/representacion/pedir-representacion/pedir-representacion.component';
import { AddRepresentacionComponent } from './componentes/roles/farmer/vistas/representacion/add-representacion/add-representacion.component';
import { SubidaMasivaComponent } from './componentes/roles/farmer/vistas/subida-masiva/subida-masiva.component';
import { NotificacionesComponent } from './componentes/roles/farmer/vistas/notificaciones/notificaciones.component';
import { AddInfoExplotacionComponent } from './componentes/roles/farmer/vistas/explotaciones/add-info-explotacion/add-info-explotacion.component';
import { SubirArchivoAccionComponent } from './componentes/roles/farmer/vistas/accionesFitosanitarias/subir-archivo-accion/subir-archivo-accion.component';
import { SubirArchivoCosechaComponent } from './componentes/roles/farmer/vistas/cosechas/subir-archivo-cosecha/subir-archivo-cosecha.component';
import { SubirArchivoAnalisisComponent } from './componentes/roles/farmer/vistas/analisis/subir-archivo-analisis/subir-archivo-analisis.component';
import { ConsultarAccionesFitosanitariasComponent } from './componentes/roles/farmer/vistas/accionesFitosanitarias/consultar-acciones-fitosanitarias/consultar-acciones-fitosanitarias.component';
import { AddAccionFitosanitariaComponent } from './componentes/roles/farmer/vistas/accionesFitosanitarias/add-accion-fitosanitaria/add-accion-fitosanitaria.component';
import { InfoAccionFitosanitariaComponent } from './componentes/roles/farmer/vistas/accionesFitosanitarias/info-accion-fitosanitaria/info-accion-fitosanitaria.component';
import { ConsultarProductosFitosanitariosComponent } from './componentes/roles/farmer/vistas/accionesFitosanitarias/consultar-productos-fitosanitarios/consultar-productos-fitosanitarios.component';
import { AddProductoFitosanitarioComponent } from './componentes/roles/farmer/vistas/accionesFitosanitarias/add-producto-fitosanitario/add-producto-fitosanitario.component';
import { ErroresComponent } from './componentes/errores/errores.component';
import { AdminComponent } from './componentes/roles/admin/admin.component';
import { FarmerComponent } from './componentes/roles/farmer/farmer.component';
import { GuestComponent } from './componentes/roles/guest/guest.component';
import { RepresentanteComponent } from './componentes/roles/representante/representante.component';
import { AuthGuard } from './utils/auth/auth.guard';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'principal', component: PrincipalComponent, children: [

      { path: '', component: NotificacionesComponent },
      { path: 'notificaciones', canActivate: [AuthGuard], data: { role: ['farmer','farm_representative'] }, component: NotificacionesComponent },

      { path: 'pedir-representacion', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: PedirRepresentacionComponent },
      { path: 'pedir-representacion/añadir-representante', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: AddRepresentacionComponent },

      { path: 'añadir-explotacion', canActivate: [AuthGuard], data: { role: ['farmer'] }, component: AddExplotacionComponent },
      { path: 'consultar-explotaciones', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: ConsultarExplotacionesComponent },
      { path: 'consultar-explotaciones/:id', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: InfoExplotacionComponent },
      { path: 'consultar-explotaciones/:id/añadir-informacion', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: AddInfoExplotacionComponent },
      { path: 'sigpacs', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: ConsultarSigpacsComponent },
      { path: 'sigpacs/añadir-sigpac', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: AddSigpacComponent },

      {
        path: 'cosechas', children: [
          { path: '', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: ConsultarCosechasComponent },
          { path: 'explotacion/:explotacionID', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: ConsultarCosechasComponent },
          { path: 'explotacion/:explotacionID/cosecha/:id', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: InfoCosechaComponent }
        ]
      },
      { path: 'añadir-cosecha', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: AddCosechaComponent },
      { path: 'subir-cosecha', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: SubirArchivoCosechaComponent },

      {
        path: 'asesores', children: [
          { path: '', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: ConsultarAsesoresComponent },
          { path: 'explotacion/:explotacionID', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: ConsultarAsesoresComponent },
          { path: 'explotacion/:explotacionID/asesor/:id', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: InfoAsesorComponent }
        ]
      },
      { path: 'añadir-asesor', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: AddAsesorComponent },
      { path: 'añadir-visita', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: AddVisitaComponent },


      {
        path: 'analisis', children: [
          { path: '', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: ConsultarAnalisisComponent },
          { path: 'explotacion/:explotacionID', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: ConsultarAnalisisComponent },
          { path: 'explotacion/:explotacionID/analisis/:id', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: InfoanalisisComponent },
        ]
      },
      { path: 'añadir-analisis', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: AddAnalisisComponent },
      { path: 'subir-analisis', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: SubirArchivoAnalisisComponent },



      {
        path: 'equipos', children: [
          { path: '', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: ConsultarEquiposAplicacionComponent },
          { path: 'explotacion/:explotacionID', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: ConsultarEquiposAplicacionComponent },
          { path: 'explotacion/:explotacionID/equipo/:id', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: InfoEquipoAplicacionComponent }
        ]
      },
      { path: 'añadir-equipo', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: AddEquipoAplicacionComponent },


      {
        path: 'control-plagas', children: [
          { path: '', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: ConsultarControlesPlagasComponent },
          { path: 'explotacion/:explotacionID', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: ConsultarControlesPlagasComponent },
          { path: 'explotacion/:explotacionID/control-plagas/:id', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: InfoControlPlagasComponent }
        ]
      },
      { path: 'añadir-control-plagas', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: AddControlPlagasComponent },

      {
        path: 'acciones-fitosanitarias', children: [
          { path: '', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: ConsultarAccionesFitosanitariasComponent },
          { path: 'explotacion/:explotacionID', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: ConsultarAccionesFitosanitariasComponent },
          { path: 'explotacion/:explotacionID/accion-fitosanitaria/:id', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: InfoAccionFitosanitariaComponent },
          { path: 'explotacion/:explotacionID/accion-fitosanitaria/:id/productos-fitosanitarios', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: ConsultarProductosFitosanitariosComponent },
          { path: 'explotacion/:explotacionID/accion-fitosanitaria/:id/productos-fitosanitarios/añadir-producto', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: AddProductoFitosanitarioComponent },
        ]
      },
      { path: 'añadir-accion-fitosanitaria', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: AddAccionFitosanitariaComponent },
      { path: 'subir-accion-fitosanitaria', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: SubirArchivoAccionComponent },

      { path: 'subir-csv', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative'] }, component: SubidaMasivaComponent }

    ]
  },
  { path: 'perfil', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative', 'guest'] }, component: PerfilComponent },
  { path: 'archivos', canActivate: [AuthGuard], data: { role: ['farmer', 'farm_representative', 'guest'] }, component: ArchivosUsuarioComponent },


  { path: 'admin/servicio/explotaciones', canActivate: [AuthGuard], data: { role: ['admin', 'inspector'] }, component: ModuloExplotacionComponent },
  { path: 'admin/servicio/notificaciones', canActivate: [AuthGuard], data: { role: ['admin', 'inspector'] }, component: ModuloNotificacionesComponent },
  { path: 'admin/servicio/usuarios', canActivate: [AuthGuard], data: { role: ['admin', 'inspector'] }, component: ModuloUsuariosComponent },

  { path: 'admin/listaUsuarios', canActivate: [AuthGuard], data: { role: ['admin', 'inspector'] }, component: UsuariosComponent },
  { path: 'admin/listaArchivos', canActivate: [AuthGuard], data: { role: ['admin', 'inspector'] }, component: ArchivosAdminComponent },

  { path: 'admin/analisis', canActivate: [AuthGuard], data: { role: ['admin', 'inspector'] }, component: AnalisisAdminComponent },

  { path: 'admin/asesores', canActivate: [AuthGuard], data: { role: ['admin', 'inspector'] }, component: AsesoresAdminComponent },

  { path: 'admin/cosechas', canActivate: [AuthGuard], data: { role: ['admin', 'inspector'] }, component: CosechasAdminComponent },

  { path: 'admin/explotaciones', canActivate: [AuthGuard], data: { role: ['admin', 'inspector'] }, component: ExplotacionesAdminComponent },

  { path: 'admin/equipos-aplicacion', canActivate: [AuthGuard], data: { role: ['admin', 'inspector'] }, component: EquiposAdminComponent },

  { path: 'admin/control-plagas', canActivate: [AuthGuard], data: { role: ['admin', 'inspector'] }, component: ControlPlagasAdminComponent },

  { path: 'admin/acciones-fitosanitarias', canActivate: [AuthGuard], data: { role: ['admin', 'inspector'] }, component: AccionesFitosanitariasAdminComponent },

  { path: '**', component: ErroresComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, RegistroComponent, PrincipalComponent, ErroresComponent, PerfilComponent, HeaderComponent, FooterComponent,
  AdminHeaderComponent, AdminComponent, FarmerComponent, GuestComponent, ModuloUsuariosComponent, ModuloExplotacionComponent, ModuloNotificacionesComponent,
  UsuariosComponent, AddExplotacionComponent, ConsultarExplotacionesComponent, InfoExplotacionComponent, AddInfoExplotacionComponent, ConsultarSigpacsComponent, AddSigpacComponent, NotificacionesComponent, PedirRepresentacionComponent,
  AddRepresentacionComponent, RepresentanteComponent, ConsultarCosechasComponent, AddCosechaComponent, InfoCosechaComponent, ConsultarAnalisisComponent, AddAnalisisComponent,
  InfoanalisisComponent, SubirArchivoAnalisisComponent, SubirArchivoCosechaComponent, ConsultarAsesoresComponent, AddAsesorComponent, ConsultarEquiposAplicacionComponent, AddEquipoAplicacionComponent, ConsultarControlesPlagasComponent,
  AddControlPlagasComponent, ConsultarAccionesFitosanitariasComponent, AddAccionFitosanitariaComponent, SubidaMasivaComponent, InfoAsesorComponent, ConsultarVisitasComponent, InfoEquipoAplicacionComponent, InfoControlPlagasComponent,
  ArchivosUsuarioComponent, AnalisisAdminComponent, AsesoresAdminComponent, CosechasAdminComponent, ExplotacionesAdminComponent, EquiposAdminComponent, ControlPlagasAdminComponent, AccionesFitosanitariasAdminComponent,
  ArchivosAdminComponent, InfoAccionFitosanitariaComponent, SubirArchivoAccionComponent, AddProductoFitosanitarioComponent, ConsultarProductosFitosanitariosComponent,
  AddVisitaComponent];

