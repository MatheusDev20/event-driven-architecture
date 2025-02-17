import { AxiosInstance } from "axios";

export type BasicRequest = {
  path: string;
  headers?: any;
  body?: any;
  formData?: FormData;
};

export type BasicResponse<T> = {
  body: T;
};

export type InstanceArgs = {
  baseUrl: string;
}

export type Context = {
  instance: AxiosInstance
  data: BasicRequest,
}