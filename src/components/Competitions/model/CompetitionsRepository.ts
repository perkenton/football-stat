import { instance } from '../../../common/constants';
import { Plan } from '../../../common/model';
import { AxiosResponse } from 'axios';

export interface CompetitionsRepository {
  getCompetitions(): Promise<AxiosResponse>;
}

export class CompetitionsRepositoryImpl implements CompetitionsRepository {

  async getCompetitions(): Promise<AxiosResponse> {
    const response = await instance
      .get(`competitions?areas=2077&plan=${Plan.TIER_ONE}`)

    return response;
  }
}