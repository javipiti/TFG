export interface loginI {
  identifier?: string | null,
  password?: string | null,
  keepLogged?: boolean | null

}

export interface registroI {
  nif?: string | null,
  name?: string | null,
  surname?: string | null,
  email?: string | null,
  password?: string | null,
  phone?: number | null,
  address?: string | null,
  postal_code?: string | null;
  province?: string | null,
  state?: string | null,
  country?: string | null
}

export interface farmI {
  id?: number | null,
  farm_type?: string | null
}

export interface plotIdentificationI {
  liczepa?: string | null,
  area?: number | null,
  crop?: string | null,
  REXA_variety?: string | null,
  seedTime?: string | null,
  collectionTime?: string | null,
  SIGPAC?: sigpacI | null,
  type?: string | null,
  'open/protected'?: string | null,
  integrated_system_advice?: string | null,
  entryDate?: string | null,
  dischargeDate?: string | null,
  'LIC/ZEPA'?: string | null,
  vulnerable_nitrate_zone?: string | null,
  'well/water intake distance'?: number | null,
  'river/reservoir distance'?: number | null,
  control_station_reference?: string | null,
  tenure_regime?: string | null
}

export interface sigpacI {
  id: number
}

export interface sigpacCompletoI {
  sigpacuse?: string | null,
  province?: string | null,
  municipality?: string | null,
  zone?: string | null,
  polygon?: string | null,
  enclosure?: string | null,
  SIGPAC_use?: string | null
}

export interface representanteI {
  NIF?: string | null,
  Autonomous_farm_register?: string | null,
  National_farm_register?: string | null,
  Email?: string | null
}

export interface cosechaI {
  date?: string | null,
  vegetable_product?: string | null,
  batch_number?: number | null,
  destination?: string | null,
  NIF_client?: string | null

}

export interface asesorI {
  name?: string | null,
  surname?: string | null,
  admission_date?: string | null,
  discharge_date?: string | null,
  creation_date?: string | null,
  license_type?: string | null

}

export interface visitaI {
  date?: string | null
}


export interface analisisI {
  date?: string | null,
  analysis_type?: string | null,
  place?: string | null,
  laboratory?: string | null

}

export interface equipoAplicacionI {
  roma?: number | null,
  equipment_number?: number | null,
  description?: string | null,
  ROMA?: number | null,
  acquisition_date?: string | null,
  inspection_date?: string | null
}

export interface controlPlagaI {
  advice_system?: string | null,
  entity_name?: string | null,
  entity_operator_id?: number | null,
}

export interface accionFitosanitariaI {
  date?: string | null,
  treated_surface?: string | null,
  advisory_order?: boolean | null,
  plague?: string | null,
  control_measures?: string | null,
  applicator?: string | null,
  efectiveness?: number | null,
  technique?: number | null

}

export interface productoFitosanitarioI {
  reference?: number | null,
  commercial_name?: string | null,
  active_substance?: string | null,
  dose?: number | null

}
