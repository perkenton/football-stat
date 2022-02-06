import { instance } from '../../../common/constants';
import { AxiosResponse } from 'axios';

export interface CompetitionRepository {
  getCompetition(url: string): Promise<AxiosResponse>,
  getMatches(url: string): Promise<AxiosResponse>,
  getTeams(url: string): Promise<AxiosResponse>,
}


export class CompetitionRepositoryImpl implements CompetitionRepository {

  async getCompetition(url: string): Promise<AxiosResponse> {
    const response = await instance
      .get(`competitions/${url}`)

    return response;
  }

  async getMatches(url: string): Promise<AxiosResponse> {
    const response = await instance
      .get(`competitions/${url}/matches`)

    return response;
  }

  async getTeams(url: string): Promise<AxiosResponse> {
    const response = await instance
      .get(`competitions/${url}/teams`)

    return response;
  }
}