
export interface tokenRI {
  token: string,
  refreshToken: string,
  status: string
}

export interface refreshTokenRI {
  jwt: string,
  refreshToken: string
}

export interface registroRI {
  status: string,
  error: errorRI
}

export interface errorRI {
  error_message: string,
  info: string,
  timestamp: string,
  code: string,
  uri: string
}

export interface errorDeleteRI {
  timestamp: string,
  status: number,
  error: string,
  message: string,
  path: string
}

export interface userRI {
  id: number,
  keepLogged: boolean,
  role: role,
  nif: string,
  name: string,
  surname: string,
  email: string,
  password: string,
  NIF: string,
  phone: number,
  address: string,
  postal_code: number,
  province: string,
  state: string,
  country: string,
  creation_date: string,
  validation_status: string,
}

export interface role {
  id: number,
  role_type: string,
  name: string
}

export interface respuestaGerenerica {
  info: string,
  timestamp: string,
  code: number,
  description: string
}

export interface validarCorreoE {
  error_message: string,
  info: string,
  timestamp: string,
  code: number,
  uri: string
}

export interface verificacionI {
  counter: number,
  description: string,
  display: boolean,
  eventType: string,
  id: number,
  userId: string
}

export interface verificarI {
  info: string,
  timestamp: string,
  code: number,
  description: string

}

export interface getFilesI {
  totalElements: number,
  totalPages: number,
  number: number,
  size: number,
  first: boolean,
  last: boolean,
  content: contentI[]
}

export interface contentI {
  id: number,
  type: string,
  original_name: string,
  name: string,
  upload_date: string,
  url: string,
  fileSize: number,
  status: string,
  comment: string,
  expiration_date: string,
  expiration_status: string
}

export interface getFarmsI {
  totalElements: number,
  totalPages: number,
  number: number,
  size: number,
  first: boolean,
  last: boolean,
  content: contentFarmI[]
}

export interface contentFarmI {
  id: number,
  farm_type: string
}

export interface plotIdentificationRI {
  liczepa: string,
  id: number,
  area: number,
  crop: string,
  REXA_variety: string,
  seedTime: string,
  collectionTime: string,
  SIGPAC: sigpacRI,
  type: string,
  'open/protected': string,
  integrated_system_advice: string,
  entryDate: string,
  dischargeDate: string,
  'LIC/ZEPA': string,
  vulnerable_nitrate_zone: string,
  'well/water intake distance': number,
  'river/reservoir distance': number,
  control_station_reference: string,
  tenure_regime: string
}

export interface sigpacRI {
  sigpacuse: string,
  id: number,
  province: string,
  municipality: string,
  zone: string,
  polygon: string,
  enclosure: string,
  SIGPAC_use: string
}

export interface representantesI {
  id: number,
  NIF: string,
  Autonomous_farm_register: string
}

export interface peticionRepresentacionI {
  id: number,
  requestDate: string,
  responseDate: string,
  farmRepresentative: number,
  farmId: number,
  status: string

}

export interface allFilesI {
  content: contentI[],
  pageable: pageableI,
  totalElements: number,
  totalPages: number,
  last: boolean,
  size: number,
  number: number,
  sort: sortI,
  numberOfElements: number,
  first: boolean,
  empty: boolean
}

export interface pageableI {
  sort: sortI,
  offset: number,
  pageSize: number,
  pageNumber: number,
  unpaged: boolean,
  paged: boolean

}

export interface sortI {
  sorted: boolean,
  unsorted: boolean,
  empty: boolean
}

export interface allUsersI {
  content: userRI[],
  pageable: pageableI,
  totalElements: number,
  totalPages: number,
  last: boolean,
  size: number,
  number: number,
  sort: sortI,
  numberOfElements: number,
  first: boolean,
  empty: boolean,
}

export interface userServiceStatusI {
  status: string,
  components: componentsI
}

export interface userNotificacionStatusI {
  status: string,
  components: componentsNotI
}

export interface componentsNotI {
  clientConfigServer: clientConfigServerI,
  db: dbI,
  discoveryComposite: discoveryCompositeI,
  diskSpace: diskSpaceI,
  mail: mailI,
  ping: pingI,
  rabbit: rabbitVersionI,
  refreshScope: refreshScopeI
}

export interface componentsI {
  clientConfigServer: clientConfigServerI,
  db: dbI,
  discoveryComposite: discoveryCompositeI,
  diskSpace: diskSpaceI,
  mail: mailI,
  ping: pingI,
  rabbit: rabbitI,
  refreshScope: refreshScopeI
}

export interface clientConfigServerI {
  status: string,
  details: detailsClientI
}
export interface detailsClientI {
  propertySources: [string, string],
}

export interface dbI {
  status: string,
  details: detailsI
}

export interface detailsI {
  database: string,
  validationQuery: string
}

export interface discoveryCompositeI {
  description: string,
  status: string,
  components: componentsDiscoveryI
}

export interface componentsDiscoveryI {
  discoveryClient: discoveryClientI
}

export interface discoveryClientI {
  description: string,
  status: string
}

export interface diskSpaceI {
  status: string,
  details: detailsDiskI
}

export interface detailsDiskI {
  total: number,
  free: number,
  threshold: number,
  exists: boolean
}

export interface mailI {
  status: string,
  details: detailsMailI
}

export interface detailsMailI {
  location: string
}

export interface pingI {
  status: string
}

export interface rabbitI {
  status: string,
  components: {
    firstRabbitTemplate: {
      status: string,
      details: {
        version: string,
      }
    },
    rabbitTemplate: {
      status: string,
      details: {
        version: string,
      }
    }
  }
}

export interface rabbitVersionI {
  status: string,
  details: {
    version: string,
  }
}


export interface refreshScopeI {
  status: string,
}

export interface getFilesFarmI {
  totalElements: number,
  totalPages: number,
  number: number,
  size: number,
  first: boolean,
  last: boolean,
  content: contentFarmUserI[]
}

export interface contentFarmUserI {
  id: number,
  original_name: string,
  status: string
}

export interface allHarvestI {
  totalElements: number,
  totalPages: number,
  number: number,
  size: number,
  first: boolean,
  last: boolean,
  content: contentHarvestI[]
}

export interface contentHarvestI {
  id: number,
  date: string,
  vegetable_product: string,
  NIF_client: string
}

export interface harvestIR {
  id: number,
  date: string,
  vegetable_product: string,
  batch_number: number,
  destination: string,
  NIF_client: string
}

export interface advisorIR {
  id: number,
  name: string,
  surname: string,
  admission_date: string,
  discharge_date: string,
  creation_date: string,
  license_type: string
}

export interface analisisIR {
  id: number,
  date: string,
  analysis_type: string,
  place: string,
  laboratory: string,
}

export interface equipmentIR {
  id: number,
  roma: number,
  equipment_number: number,
  description: string,
  ROMA: number,
  acquisition_date: string,
  inspection_date: string
}

export interface pesteIR {
  id: number,
  advice_system: string,
  entity_name: string,
  entity_operator_id: string
}

export interface pesteIR2 {
  id: number,
  advice_system: string,
  entity_name: string,
  entity_operator_id: string,
  farm_representative_id: number,
  advisors_staff_id: number
}

export interface fitosanitarioIR {
  id: number,
  plague: string,
  technique: number
}

export interface fitosanitarioAdmin {
  id: number,
  plague: string,
  technique: number,
  treated_surface: string,
  efectiveness: number,
  advisory_order: boolean,
  applicator:string,
  control_measures: string,
  date: string
  farmId: { id: number, farm_type: string }
}

export interface productoIR {
  id: number,
  reference: number,
  commercial_name: string,
  active_substance: string,
  dose: number
}


export interface allAsesoresI {
  totalElements: number,
  totalPages: number,
  number: number,
  size: number,
  first: boolean,
  last: boolean,
  content: contentAsesorestI[]
}

export interface contentAsesorestI {
  id: number,
  name: string
}

export interface allAnalisisI {
  totalElements: number,
  totalPages: number,
  number: number,
  size: number,
  first: boolean,
  last: boolean,
  content: contentAnalisisI[]
}

export interface contentAnalisisI {
  id: number,
  date: string,
  laboratory: string
}


export interface allEquiposI {
  totalElements: number,
  totalPages: number,
  number: number,
  size: number,
  first: boolean,
  last: boolean,
  content: contentEquiposI[]
}

export interface contentEquiposI {
  id: number,
  description: string,
  equipment_number: number
}

export interface allControlesI {
  totalElements: number,
  totalPages: number,
  number: number,
  size: number,
  first: boolean,
  last: boolean,
  content: contentControlesI[]
}

export interface contentControlesI {
  id: number,
  entity_name: string,
  entity_operator_id: number
}


export interface allAnalisisAdminI {
  content: analisisIR[],
  pageable: pageableI,
  totalElements: number,
  totalPages: number,
  last: boolean,
  size: number,
  number: number,
  sort: sortI,
  numberOfElements: number,
  first: boolean,
  empty: boolean

}

export interface allAsesoresAdminI {
  content: advisorIR[],
  pageable: pageableI,
  totalElements: number,
  totalPages: number,
  last: boolean,
  size: number,
  number: number,
  sort: sortI,
  numberOfElements: number,
  first: boolean,
  empty: boolean

}

export interface allCosechasAdminI {
  content: harvestIR[],
  pageable: pageableI,
  totalElements: number,
  totalPages: number,
  last: boolean,
  size: number,
  number: number,
  sort: sortI,
  numberOfElements: number,
  first: boolean,
  empty: boolean

}

export interface allFarmsAdminI {
  content: contentFarmAdminI[],
  pageable: pageableI,
  totalElements: number,
  totalPages: number,
  last: boolean,
  size: number,
  number: number,
  sort: sortI,
  numberOfElements: number,
  first: boolean,
  empty: boolean

}

export interface contentFarmAdminI {
  farm: contentFarmI,
  plotIdentification: plotIdentificationRI
}

export interface allEquiposAdminI {
  content: equipmentIR[],
  pageable: pageableI,
  totalElements: number,
  totalPages: number,
  last: boolean,
  size: number,
  number: number,
  sort: sortI,
  numberOfElements: number,
  first: boolean,
  empty: boolean

}

export interface allControlesAdminI {
  content: pesteIR2[],
  pageable: pageableI,
  totalElements: number,
  totalPages: number,
  last: boolean,
  size: number,
  number: number,
  sort: sortI,
  numberOfElements: number,
  first: boolean,
  empty: boolean

}

export interface allAccionesAdminI {
  content: fitosanitarioAdmin[],
  pageable: pageableI,
  totalElements: number,
  totalPages: number,
  last: boolean,
  size: number,
  number: number,
  sort: sortI,
  numberOfElements: number,
  first: boolean,
  empty: boolean

}


export interface notificacionI {
  id: number,
  userId: number,
  eventType: string,
  description: string,
  display: boolean,
  counter: 1
}


export interface accionFitosanitariaIR {
  advisory_order: boolean,
  applicator: string,
  control_measures: string,
  date: string,
  efectiveness: number,
  farmId: { id: number, farm_type: string }
  id: number,
  plague: string,
  technique: number,
  treated_surface: string
}