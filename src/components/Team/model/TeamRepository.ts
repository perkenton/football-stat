import { instance } from '../../../common/constants';
import { AxiosResponse } from 'axios';

export interface TeamRepository {
  getTeam(url: string): Promise<AxiosResponse>;
  getTeamsMatch(url: string): Promise<AxiosResponse>;
}

export class TeamRepositoryImpl implements TeamRepository {

  async getTeam(url: string): Promise<AxiosResponse> {
    const response = await instance
      .get(url)

    return response;
  }

  async getTeamsMatch(url: string): Promise<AxiosResponse> {
    const response = await instance
      .get(url)

    return response;
  }
}