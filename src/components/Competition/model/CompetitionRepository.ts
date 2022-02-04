import { instance } from '../../../common/constants';
import { CompetitionType, Match, Team } from '../../../common/model';

export interface CompetitionRepository {
  getCompetition(competitionId: number): Promise<CompetitionType>,
  getMatches(competitionId: number): Promise<Match[]>,
  getTeams(competitionId: number): Promise<Team[]>,
}


export class CompetitionRepositoryImpl implements CompetitionRepository {

  async getCompetition(competitionId: number): Promise<CompetitionType> {
    const response = await instance
      .get(`competitions/${competitionId}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log('getCompetition error', error);
      });

    return response;
  }

  async getMatches(competitionId: number): Promise<Match[]> {
    const response = await instance
      .get(`competitions/${competitionId}/matches`)
      .then((res) => {
        return res.data.matches;
      })
      .catch((error) => {
        console.log('getMatches error', error);
      });

    return response;
  }

  async getTeams(competitionId: number): Promise<Team[]> {
    const response = await instance
      .get(`competitions/${competitionId}/teams`)
      .then((res) => {
        return res.data.teams;
      })
      .catch((error) => {
        console.log('getTeams error', error);
      });

    return response;
  }
}