import { instance } from '../../../common/constants';
import { AxiosResponse } from 'axios';

export interface CompetitionRepository {
  getCompetition(competitionId: number): Promise<AxiosResponse>,
  getMatches(competitionId: number): Promise<AxiosResponse>,
  getTeams(competitionId: number): Promise<AxiosResponse>,
}


export class CompetitionRepositoryImpl implements CompetitionRepository {

  async getCompetition(competitionId: number): Promise<AxiosResponse> {
    const response = await instance
      .get(`competitions/${competitionId}`)

    return response;
  }

  async getMatches(competitionId: number): Promise<AxiosResponse> {
    const response = await instance
      .get(`competitions/${competitionId}/matches`)

    return response;
  }

  async getTeams(competitionId: number): Promise<AxiosResponse> {
    const response = await instance
      .get(`competitions/${competitionId}/teams`)

    return response;
  }
}