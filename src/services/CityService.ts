import { apiUrl } from '../constants/apiUrl';
import { ICity } from '../types/ICity';
import axios, { AxiosResponse } from 'axios';

export default class CityService {
  static async getCities(name: string): Promise<AxiosResponse<ICity[]>> {
    return axios.get<ICity[]>(
      `${apiUrl.CITY_API_URL}?q=${name}&limit=10&appid=${apiUrl.API_KEY}`
    );
  }
}
