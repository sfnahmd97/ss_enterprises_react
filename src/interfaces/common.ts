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
  designation_label?: string;
  status?: boolean;
}
