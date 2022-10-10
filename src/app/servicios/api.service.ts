import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { accionFitosanitariaI, analisisI, asesorI, controlPlagaI, cosechaI, equipoAplicacionI, farmI, loginI, plotIdentificationI, productoFitosanitarioI, registroI, representanteI, sigpacCompletoI, visitaI } from '../utils/interfaces/peticiones.component';
import { allUsersI, allFilesI, respuestaGerenerica, userServiceStatusI, userNotificacionStatusI, advisorIR, allAsesoresI, analisisIR, equipmentIR, contentFarmI, getFarmsI, plotIdentificationRI, sigpacRI, getFilesFarmI, harvestIR, allHarvestI, pesteIR, representantesI, peticionRepresentacionI, refreshTokenRI, tokenRI, userRI, productoIR, accionFitosanitariaIR } from '../utils/interfaces/respuestas.component';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  usuario = 'https://localhost:8080/';
  notificaciones = 'https://localhost:8082/';
  explotacion = 'https://localhost:8081/';
  admin = 'https://localhost:8083/';

  constructor(private http: HttpClient) { }

 

  // ENDPOINTS ADMIN E INSPECTOR
  //utilizo proxy
  getAllAnalysis(page:number): Observable<any>{
    let url = '/admin/analysis?search=sortBy:id,size:10,page:' + page; 
    return this.http.get<any>(url);
  }

  getAllUsers(page:number): Observable<allUsersI> {
    let url = '/admin/users?search=sortBy:id,size:10,page:' + page; 
    return this.http.get<allUsersI>(url);
  }

  getAllFiles(page:number): Observable<allFilesI> {
    let url = '/admin/files?search=sortBy:id,type:ID_CARD,size:10,page:' + page; 
    return this.http.get<allFilesI>(url);
  }

  getAllFilesAdmin(page:number): Observable<allFilesI> {
    let url = '/admin/files?search=sortBy:id,size:10,page:' + page; 
    return this.http.get<allFilesI>(url);
  }

  getAllAdvisorStaff(page:number): Observable<any>{
    let url = '/admin/advisorStaff?search=sortBy:id,size:10,page:' + page; 
    return this.http.get<any>(url);
  }

  getAllHarvest(page:number): Observable<any>{
    let url = '/admin/harvests?search=sortBy:id,size:10,page:' + page; 
    return this.http.get<any>(url);
  }


  getAllFarms(page:number): Observable<any>{
    let url = '/admin/farms?search=sortBy:id,size:10,page:' + page;
    return this.http.get<any>(url);
  }

  getAllAplicationEquipements(page:number): Observable<any>{
    let url = '/admin/applicationEquipments?search=sortBy:id,size:10,page:' + page;
    return this.http.get<any>(url);
  }

  getAllPest(page:number): Observable<any>{
    let url = '/admin/integratedPest?search=sortBy:id,size:10,page:'+ page;
    return this.http.get<any>(url);
  }

  getAllPhitosanitary(page:number): Observable<any>{
    let url = '/admin/phytosanitaryActions?search=sortBy:id,size:10,page:'+ page;
    return this.http.get<any>(url);
  }

  getFile(fileID:number): Observable<Blob>{
    let url = '/admin/files/' + fileID;
    return this.http.get(url,{ responseType: 'blob' });
  }


  // FIN ENDPOINTS ADMIN E INSPECTOR

  // ENDPOINTS INSPECTOR

  getFarmBook(farmID:number): Observable<Blob> {
    let url = '/inspector/farms/'+farmID+'/farmBook'; // utilizo proxy
    return this.http.get(url,{ responseType: 'blob' });
  }

  // FIN ENDPOINTS INSPECTOR

   // ENDPOINTS ADMIN ------------------------------

   aceptarArchivo(id: number): Observable<respuestaGerenerica> {
    let url = '/admin/file?file=' + id + '&state=ACCEPT';
    return this.http.put<respuestaGerenerica>(url, null);
  }

  rechazarArchivo(id: number): Observable<respuestaGerenerica> {
    let url = '/admin/file?file=' + id + '&state=DENY';
    return this.http.put<respuestaGerenerica>(url, null);
  }

  checkUserServiceStatus(): Observable<userServiceStatusI> {
    let url = this.usuario + 'actuator/health';
    return this.http.get<userServiceStatusI>(url);
  }

  restartUserService(){
    let url = this.usuario + 'actuator/refresh';
    return this.http.post(url, null);
  }

  checkExplotacionServiceStatus(): Observable<userServiceStatusI> {
    let url = this.explotacion + 'actuator/health';
    return this.http.get<userServiceStatusI>(url);
  }

  restartExplotacionService(){
    let url = this.explotacion + 'actuator/refresh';
    return this.http.post(url, null);
  }

  checkNotificacionServiceStatus(): Observable<userNotificacionStatusI> {
    let url = this.notificaciones + 'actuator/health';
    return this.http.get<userNotificacionStatusI>(url);
  }

  restartNotificacionService(){
    let url = this.notificaciones + 'actuator/refresh';
    return this.http.post(url, null);
  }  


  // FIN ENDPOINTS ADMIN

  // ENDPOINTS EXPLOTACION

  // ENDPOINTS ADVISOR STAFF 

  postAdvisor(farmID:number, advisor:asesorI): Observable<respuestaGerenerica>{
    let url = '/farms/'+ farmID+ '/advisorStaff';
    return this.http.post<respuestaGerenerica>(url,advisor);
  }

  postVisit(advisorID:number, visita:visitaI): Observable<respuestaGerenerica>{
    let url = '/advisorStaffs/'+ advisorID+ '/advisorVisit';
    return this.http.post<respuestaGerenerica>(url,visita);
  }

  getAdvisorInfo(advisorID:number): Observable<any>{
    let url = '/advisorStaffs/'+ advisorID;
    return this.http.get<any>(url);
  }

  updateAdvisorInfo(advisor:advisorIR): Observable<respuestaGerenerica>{
    let url = '/advisorStaffs/'+ advisor.id;
    return this.http.patch<respuestaGerenerica>(url,advisor);
  }

  getAllAdvisor(farmID:number, page:number): Observable<allAsesoresI>{
    let url = '/farms/'+ farmID +'/advisorStaffs?search=size:10,page'+ page;
    return this.http.get<allAsesoresI>(url);
  }

  getAllVisits(asesorID:number): Observable<any>{
    let url = '/advisorStaffs/'+asesorID+'/advisorVisits';
    return this.http.get<any>(url);
  }

  deleteAdvisor(advisorID:number): Observable<respuestaGerenerica>{
    let url = '/advisorStaffs/'+ advisorID;
    return this.http.delete<respuestaGerenerica>(url);
  }
  
  // FIN ENDPOINTS ADVISOR STAFF

  // ENDPOINTS ANALYSIS

  getAllAnalysisUser(farmID:number,page:number): Observable<any>{
    let url = '/farms/'+ farmID +'/analysis?search=size:10,page'+ page;
    return this.http.get<any>(url);
  }


  postAnalysis(farmID:number, analisis:analisisI): Observable<respuestaGerenerica>{
    let url = '/farms/'+farmID+'/analysis';
    return this.http.post<respuestaGerenerica>(url,analisis);
  }

  uploadAnalysisFile(analisisID:number, file:File, fecha:Date): Observable<respuestaGerenerica>{
    
    const formData = new FormData();
    formData.append("analysisFile", file);

    let url = '/analysis/' + analisisID + '/upload?expiration_date='+fecha;
    return this.http.post<respuestaGerenerica>(url, formData);
  }

  getAnalysis(analisisID:number): Observable<analisisIR>{
    let url = '/analysis/'+analisisID;
    return this.http.get<analisisIR>(url);
  }

  updateAnalysis(analisis:analisisIR): Observable<respuestaGerenerica>{
    let url = '/analysis/'+analisis.id;
    return this.http.patch<respuestaGerenerica>(url,analisis);
  }

  deleteAnalysis(analisisID:number): Observable<respuestaGerenerica>{
    let url = '/analysis/'+analisisID;
    return this.http.delete<respuestaGerenerica>(url);
  }

  downloadAnalysis(analisisID:number, fileID:number): Observable<Blob>{
    let url = '/analysis/'+analisisID+'/files/'+ fileID;
    return this.http.get(url,{ responseType: 'blob' });
  }

  // FIN ENDPOINTS ANALYSIS

  // ENDPOINTS EQUIPMENT 

  getAllEquipmentUser(farmID:number,page:number): Observable<any>{
    let url = '/farms/'+ farmID +'/applicationEquipments?search=size:10,page'+ page;
    return this.http.get<any>(url);
  }
  getEquipment(equipmentID:number): Observable<equipmentIR>{
    let url = '/applicationEquipments/' + equipmentID;
    return this.http.get<equipmentIR>(url);
  }
  deleteEquipment(equipmentID:number): Observable<respuestaGerenerica>{
    let url = '/applicationEquipments/' + equipmentID;
    return this.http.delete<respuestaGerenerica>(url);
  }
  updateEquipment(equipment:equipmentIR): Observable<respuestaGerenerica>{
    let url = '/applicationEquipments/' + equipment.id;
    return this.http.patch<respuestaGerenerica>(url,equipment);
  }
  postEquipment(farmID:number, equipment:equipoAplicacionI): Observable<respuestaGerenerica>{
    let url = '/farms/'+farmID+'/applicationEquipment';
    return this.http.post<respuestaGerenerica>(url, equipment);
  }

  // FIN ENDPOINTS EQUIPMENT
  
  // ENDPOINTS CSV FILES

  uploadCSVFile(farmID:number, dataType:string, file:File): Observable<respuestaGerenerica>{

    const formData = new FormData();
    formData.append("userFile", file);

    let url = '/farm/'+farmID+'/csv/'+ dataType+'';
    return this.http.post<respuestaGerenerica>(url, formData);
  }

  // FIN ENDPOINTS CSV FILES

  // ENDPOINTS FARM

  getFarmBookUser(farmID: number): Observable<Blob>{
    let url = '/farms/'+farmID+'/farmBook';
    return this.http.get(url,{ responseType: 'blob' });
  }


  getFarm(farmID: number): Observable<contentFarmI>{
    let url = this.explotacion + 'farms/' + farmID;
    return this.http.get<contentFarmI>(url);
  }

  deleteFarm(farmID: number) {
    let url = this.explotacion + 'farms/' + farmID;
    return this.http.delete(url);
  }

  updateFarm(farm: farmI){
    let url = this.explotacion + 'farms/' + farm.id;
    return this.http.patch(url, farm);
  }

  getAllFarmsUser(page:number): Observable<getFarmsI> {
    let url = this.explotacion + 'farms?search=sortBy:id,size:10,page:' + page;
    return this.http.get<getFarmsI>(url);
  }

  getAllFarmsUserNoPage(): Observable<getFarmsI> {
    let url = this.explotacion + 'farms?search=';
    return this.http.get<getFarmsI>(url);
  }

  getFarmsType(farmType: string): Observable<getFarmsI> {
    let url = this.explotacion + 'farms?search=farmType:' + farmType;
    return this.http.get<getFarmsI>(url);
  }
  
  addExplotacion(farm: farmI): Observable<respuestaGerenerica> {
    let url = this.explotacion + 'farms';
    return this.http.post<respuestaGerenerica>(url, farm);
  }
  
  getPlotIdentification(farmID:number): Observable<plotIdentificationRI> {
    let url = this.explotacion + 'farms/'+farmID+'/plotIdentification';
    return this.http.get<plotIdentificationRI>(url);
  }

  savePlotIdentification(plotid: plotIdentificationI, farmID:number): Observable<respuestaGerenerica> {
    let url = this.explotacion + 'farms/'+farmID+'/plotIdentification';
    return this.http.post<respuestaGerenerica>(url, plotid);
  }

  updatePlotID(plotid: plotIdentificationI, farmID:number): Observable<respuestaGerenerica> {
    let url = this.explotacion + 'farms/'+ farmID + '/plotIdentification';    
    return this.http.patch<respuestaGerenerica>(url, plotid);
  }

  postSIGPAC(sigpac: sigpacCompletoI): Observable<respuestaGerenerica> {
    let url = this.explotacion + 'SIGPAC';
    return this.http.post<respuestaGerenerica>(url, sigpac);
  }

  getAllSIGPAC(): Observable<sigpacRI[]> {
    let url = this.explotacion + 'SIGPAC';
    return this.http.get<sigpacRI[]>(url);
  }

  getAllFarmFiles(farmID:number,page:number): Observable<getFilesFarmI>{
    let url = '/farms/'+farmID+'/files?search=size:10,page:'+page;
    return this.http.get<getFilesFarmI>(url);
  }
  
  // FIN ENDPOINTS FARM

  // ENDPOINTS HARVEST

  postHarvestFile(harvestID:number, file:File, fecha:Date): Observable<respuestaGerenerica>{
    
    const formData = new FormData();
    formData.append("harvestFile", file);

    let url = '/harvests/' + harvestID + '/upload?expiration_date='+fecha;
    return this.http.post<respuestaGerenerica>(url, formData);
  }

  getHarvest(harvestID:number): Observable<harvestIR>{
    let url = '/harvests/'+ harvestID; //utilizo proxy
    return this.http.get<harvestIR>(url);
  }

  deleteHarvest(harvestID:number): Observable<respuestaGerenerica>{
    let url = '/harvests/'+ harvestID; //utilizo proxy
    return this.http.delete<respuestaGerenerica>(url);
  }

  updateHarvest(harvest:harvestIR): Observable<respuestaGerenerica>{
    let url = '/harvests/'+ harvest.id; //utilizo proxy
    return this.http.patch<respuestaGerenerica>(url,harvest);
  }  

  postHarvest(farmID:number, harvest:cosechaI): Observable<respuestaGerenerica>{
    let url = '/farms/'+ farmID +'/harvest'; //utilizo proxy
    return this.http.post<respuestaGerenerica>(url, harvest);
  }

  getAllHarvestUser(farmID:number, page:number): Observable<allHarvestI>{
    let url = '/farms/'+ farmID +'/harvests?search=size:10,page:' + page; //utilizo proxy
    return this.http.get<allHarvestI>(url);
  }

  getHarvestFile(harvestID:number, fileID:number): Observable<Blob>{
    let url = '/harvests/'+harvestID+'/files/'+ fileID;
    return this.http.get(url,{ responseType: 'blob' });
  }

  // FIN ENDPOINTS HARVEST

  // ENDPOINTS PEST

  //Devuelve todos los controles integrados de plagas
  postControl(farmID:number, peste:controlPlagaI): Observable<respuestaGerenerica>{
    let url = '/farms/'+ farmID +'/pestManagement'; //utilizo proxy
    return this.http.post<respuestaGerenerica>(url, peste);
  }

  /**
 * Devuelve un control de plagas
 */
  getControl(pesteID:number): Observable<pesteIR>{
    let url = '/pestManagements/'+ pesteID;
    return this.http.get<pesteIR>(url);
  }

  //Elimina todos los controles integrados de plagas
  deleteControl(pesteID:number): Observable<respuestaGerenerica>{
    let url = '/pestManagements/'+ pesteID;
    return this.http.delete<respuestaGerenerica>(url);
  }

  //Actualiza todos los controles integrados de plagas
  updateControl(peste:pesteIR): Observable<respuestaGerenerica>{
    let url = '/pestManagements/'+ peste.id;
    return this.http.patch<respuestaGerenerica>(url, peste);
  }

  //Devuelve todos los controles integrados de plagas
  getAllControlUser(farmID:number, page:number): Observable<any>{
    let url = '/farms/'+ farmID +'/pestManagements?search=size:10,page'+ page;
    return this.http.get<any>(url);
  }
  // FIN ENDPOINTS PEST

  // ENDPOINTS PHYTOSANITARY


  //Sube un archivo fitosanitario
  postPhytosanitaryFile(accionID:number, file:File, fecha:Date): Observable<respuestaGerenerica>{

    const formData = new FormData();
    formData.append("actionFile", file);

    let url = '/phytosanitaryActions/'+ accionID +'/upload?expiration_date=' + fecha;
    return this.http.post<respuestaGerenerica>(url, formData);
  }

  //Crea una nueva accion fitosanitaria
  postPhytosanitary(farmID:number, fitosanitario:accionFitosanitariaI): Observable<respuestaGerenerica>{
    let url = '/farms/' + farmID +'/phytosanitaryAction';
    return this.http.post<respuestaGerenerica>(url, fitosanitario);
  }

  //Crea un nuevo producto fitosanitario
  postPhytosanitaryProduct(fitosanitarioID:number, producto:productoFitosanitarioI): Observable<respuestaGerenerica>{
    let url = '/phytosanitaryAction/' + fitosanitarioID +'/phytosanitaryProduct';
    return this.http.post<respuestaGerenerica>(url, producto);
  }

  //Devuelve todos los productos fitosanitarios
  getAllPhytosanitaryProducts(accionID:number): Observable<any>{
    let url = '/phytosanitaryAction/'+accionID+'/phytosanitaryProducts';
    return this.http.get<any>(url);
  }

  //Devuelve una accion fitosanitaria
  getPhytosanitary(accionID:number): Observable<any>{
    let url = '/phytosanitaryActions/'+ accionID;
    return this.http.get<any>(url);
  }

  //Devuelve un array con todas las acciones fitosanitarias del usuario
  getAllPhytosanitaryUser(farmID:number, page:number): Observable<any>{
    let url = '/farms/'+ farmID +'/phytosanitaryActions?search=size:10,page'+ page;
    return this.http.get<any>(url);
  }

  //Actualiza una accion fitosanitaria
  updatePhytosanitary(accion:accionFitosanitariaIR): Observable<respuestaGerenerica>{
    let url = '/phytosanitaryActions/' + accion.id;
    return this.http.patch<any>(url, accion);
  }

  //Elimina una accion fitosanitaria
  deletePhytosanitary(accionID:number): Observable<respuestaGerenerica>{
    let url = '/phytosanitaryActions/'+ accionID;
    return this.http.delete<respuestaGerenerica>(url);
  }

  //Actualiza un producto fitosanitario
  updatePhytosanitaryProduct(producto:productoIR): Observable<respuestaGerenerica>{
    let url = '/phytosanitaryProducts/' + producto.id;
    return this.http.patch<any>(url, producto);
  }

  //Descarga un archivo fitosanitario
  getPhytosanitaryFile(accionID:number, fileID:number): Observable<Blob>{
    let url = '/phytosanitaryActions/'+accionID+'/files/'+ fileID;
    return this.http.get(url,{ responseType: 'blob' });
  }

  // FIN ENDPOINTS PHYTOSANITARY

  // FIN ENDPOINTS EXPLOTACION

  // ENDPOINTS NOTIFICACIONES

  //Elimina las notifaciones de tipo "AboutToexpire" y "expired"
  cleanNotifications(notificacion:any): Observable<any>{
    let url = '/notifications/clean';
    return this.http.post<any>(url,notificacion);
  }

  //Devuelve un array con las noticicaciones del usuario
  getNotificaciones(): Observable<any[]> {
    let url = '/notifications';
    return this.http.get<any[]>(url);
  }


  // FIN ENDPOINTS NOTIFICACIONES

  

  // ENDPOINTS REPRESENTANTE

  //Acepta la solicitud de representacion
  aceptarPeticionRepresentacion(representacionID:number): Observable<respuestaGerenerica> {
    let url = this.usuario + 'representRequest/'+ representacionID +'?action=Accept';
    return this.http.post<respuestaGerenerica>(url, null);
  }

  //Rechaza la solicitud de representacion
  rechazarPeticionRepresentacion(representacionID:number): Observable<respuestaGerenerica> {
    let url = this.usuario + 'representRequest/'+ representacionID +'?action=Deny';
    return this.http.post<respuestaGerenerica>(url, null);
  }

  // Crea una petición de representación
  postRepresentacion(farmID:number, representanteID:number): Observable<respuestaGerenerica> {
    let url = this.usuario + 'farms/'+ farmID +'/farmRepresentative/'+ representanteID +'/representRequest';
    return this.http.post<respuestaGerenerica>(url, null);
  }

  // Crea un nuevo representante
  postRepresentante(representante: representanteI): Observable<respuestaGerenerica> {
    let url = this.usuario + 'farmRepresentative';
    return this.http.post<respuestaGerenerica>(url, representante);
  }

  //Devuelve un array con los representantes disponibles en la plataforma
  getRepresentantes(): Observable<representantesI[]> {
    let url = this.usuario + 'farmRepresentatives?identification=';
    return this.http.get<representantesI[]>(url);
  }

  //Devuelve un array con las peticiones de representacion
  getPeticionesRepresentacion(): Observable<peticionRepresentacionI[]> {
    let url = this.usuario + 'representRequest';
    return this.http.get<peticionRepresentacionI[]>(url);
  }

  // FIN ENDPOINTS REPRESENTANTE

  // ENDPOINTS USER

  
  //Actualiza el token
  refreshToken(refresh: string): Observable<refreshTokenRI> {
    let url = this.usuario + '/refreshtoken';
    return this.http.post<refreshTokenRI>(url, refresh);
  }

  //Realiza el registro en la plataforma
  registro(form: registroI): Observable<any> {
    let url = this.usuario + 'user';
    return this.http.post<any>(url, form)
  }

  //Elimina el usuario
  deleteUser(): Observable<respuestaGerenerica> {
    let url = this.usuario + 'user';
    return this.http.delete<respuestaGerenerica>(url);
  }

  
  //Actualiza los datos del usuario
  putUser(user:userRI): Observable<any> {
    let url = this.usuario + 'user';
    return this.http.patch<any>(url, user);
  }
  

  //Sube el archivo de verificación del DNI
  uploadVerificacion(userID:number, file:File): Observable<respuestaGerenerica> {

    const formData = new FormData();
    formData.append("userFile", file);

    let url = this.usuario + 'users/' + userID + '/upload';    
    return this.http.post<respuestaGerenerica>(url, formData);
  }

  //Devuelve un archivo del usuario
  getFileUser(userID: number, fileID:number): Observable<Blob>{
    let url = this.usuario + 'users/'+ userID + '/files/' + fileID;
    return this.http.get(url,{ responseType: 'blob' });
  }

  //Realiza el login en la plataforma
  login(form: loginI): Observable<tokenRI> {
    let url = this.usuario + 'login';
    return this.http.post<tokenRI>(url, form)
  }

  //Devuelve todos los archivos del usuario logueado
  getAllFilesUser(userID: number,page:number): Observable<any> {
    let url = this.usuario + 'users/' + userID + '/files?search=sortBy:id,size:10,page:'+page +','; // la coma extra es porque da error el backend
    return this.http.get<any>(url);
  }
  
  //Devuelve un usuario
  getUser(): Observable<userRI> {
    let url = this.usuario + 'users';
    return this.http.get<userRI>(url);
  }

  //Valida el correo de usuario
  validarCorreo(validarTokenCorreo: string): Observable<respuestaGerenerica> {
    let url = this.usuario + 'users/registrationConfirm?token=' + validarTokenCorreo;
    return this.http.put<respuestaGerenerica>(url, null);
  }  

  // FIN ENDPOINTS USER  
}
