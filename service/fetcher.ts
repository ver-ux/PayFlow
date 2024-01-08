import { AxiosRequestConfig } from 'axios';

import { api } from './api';

export async function fetcher<T = any>(
  url: string,
  config: AxiosRequestConfig
): Promise<T> {
  const response = await api(url, config);

  if (response.status < 200 || response.status > 399) {
    throw new Error('Fetch error.');
  }

  return response.data;
}
