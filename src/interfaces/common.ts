 export interface DesignType {
  id?: number;
  title: string;
  short: string;
  status: boolean;
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
  status: boolean;
}

 export interface Finishing {
  id?: number;
  title: string;
  short: string;
  status: boolean;
}

export interface UserData {
  name: string;
  email: string;
}