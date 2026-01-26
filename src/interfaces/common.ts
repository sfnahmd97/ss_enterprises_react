 export interface DesignType {
  id?: number;
  title: string;
  short: string;
  status?: boolean;
}
 
interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface ListApiResponse<T> {
  success: boolean;
  data: T;
  meta: PaginationMeta;
}

 export interface Color {
  id?: number;
  title: string;
  short: string;
  status?: boolean;
}

 export interface Finishing {
  id?: number;
  title: string;
  short: string;
  status?: boolean;
}

export interface UserData {
  name: string;
  email: string;
}

export interface DoorPart {
  id: number;
  part_name: string;
}
 export interface DoorPartSize {
  id?: number;
  size: string;
  door_part_id: number | "";
  status: boolean;
  doorPart?: DoorPart;
}

export interface Design {
  id?: number;
  design_number: string;
  design_type_short: string;
  design_type_id: number | "";
  panel_color_id: number | "";
  a_section_color_id: number | "";
  frame_color_id: number | "";
  finishing_ids?: number[];
  finishings?: Finishing[];
  image: File | null;
  image_name?: string;
  status: boolean;
  design_type?:DesignType;
  panel_color?:Color;
  a_section_color?:Color;
  frame_color?:Color;
}

 export interface Employee {
  id?: number;
  name: string;
  phone_no: string;
  email: string;
  address: string;
  designation: string;
  contract_type: string;
  designation_label?: string;
  status?: boolean;
}

export interface Distributor {
  id?: number;
  name: string;
  phone_no?: string;
  email?: string;
  address?: string;
  status?: boolean;
}

 export interface Location {
  id?: number;
  location_name: string;
  location_key?: string;
  state_id: string;
  district_id: string;
  state?: string;
  district?: string;
  status?: boolean;
}
 export interface States {
  id?: number;
  key: string;
  name: string;
}
 export interface Districts {
  id?: number;
  key: string;
  name: string;
  state?: string;
}

export interface Area {
  id?: number;
  area_name: string;
  type: string;
  state_id: number | "";
  district_ids: number[];
  location_ids: number[];
  status: boolean;
  is_all_location?: Record<number, boolean>;
}

export interface AreaAssign {
  id?: number;
  assign_type?: string;
  person_id: number | "";
  area_id: number | "";
}

 export interface Customer {
  id?: number;
  name: string;
  phone_no: string | "";
  email: string | "";
  state_id: number | "";
  district_id: number | "";
  location_id: number | "";
  brand_id: number | "";
  gstin: string | "";
  status?: boolean;
}

 export interface ShiftTime {
  id?: number;
  title: string;
  type: string;
  start_time: string;
  end_time: string;
  status?: boolean;
}

export interface Brand {
  id?: number;
  name: string;
  status?: boolean;
}

export interface Machine {
  id?: number;
  name: string;
  status?: boolean;
}
