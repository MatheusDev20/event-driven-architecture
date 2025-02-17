/* Just in time Package without the compilation step */


import axios, { AxiosInstance } from 'axios';
import { InstanceArgs } from './@types';

export const getAxiosInstace = ({ baseUrl }: InstanceArgs): AxiosInstance => {
  return axios.create({
    baseURL: baseUrl,
    timeout: 5000,
  });
};

