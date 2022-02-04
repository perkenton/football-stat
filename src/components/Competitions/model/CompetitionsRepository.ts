import { instance } from '../../../common/constants';
import { CompetitionType, Plan } from '../../../common/model';

export interface CompetitionsRepository {
  getCompetitions(): Promise<CompetitionType[]>;
}

export class CompetitionsRepositoryImpl implements CompetitionsRepository {

  async getCompetitions(): Promise<CompetitionType[]> {
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