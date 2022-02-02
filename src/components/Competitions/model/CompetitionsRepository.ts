import { instance } from '../../../common/constants';
import { Competition, Plan } from '../../../common/model';

export interface CompetitionsRepository {
  getCompetitions(): Promise<Competition[]>;
}

export class CompetitionsRepositoryImpl implements CompetitionsRepository {

  async getCompetitions(): Promise<Competition[]> {
    const plan = Plan.TIER_ONE;

    const response = await instance
      .get(`competitions?areas=2077&plan=${plan}`)
      .then((res) => {
        return res.data.competitions;
      })
      .catch((error) => {
        console.log('getCompetitions error', error);
      });

    return response;
  }
}