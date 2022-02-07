import { TeamRepository } from './TeamRepository';
import { TeamType, Match } from '../../../common/model';
import { useLocation } from 'react-router-dom';


export interface TeamPresenter {
  loading: boolean;
  getTeam(): Promise<TeamType>;
  getTeamsMatch(): Promise<Match[]>;
}

export class TeamPresenterImpl implements TeamPresenter {
  constructor(private teamRepositoryImpl: TeamRepository) {}
  public loading: boolean = false;

  private location = useLocation();
  private teamId = new URLSearchParams(this.location.search).get('teamId');


  async getTeam(): Promise<TeamType> {
    this.loading = true;

    const response = await this.teamRepositoryImpl.getTeam(`teams/${this.teamId}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log('getTeam error', error);
      });
    this.loading = false;

    return response;
  }

  async getTeamsMatch(): Promise<Match[]> {
    this.loading = true;

    const response = await this.teamRepositoryImpl.getTeam(`teams/${this.teamId}/matches`)
      .then((res) => {
        return res.data.matches;
      })
      .catch((error) => {
        console.log('getTeamsMatch error', error);
      });
    this.loading = false;

    return response;
  }

}