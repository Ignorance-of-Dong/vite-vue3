import type { Canceler } from "axios";
export interface Pedding {
  conf: string;
  func: Canceler;
}

export interface RequestParmas {}

export interface Api {
  method: string;
  url: string;
}
export type Data = any;
export type Cb = Function;

export interface RequestHandle<T> {
  (api: Api, data: Data, cb: Cb): T;
}
