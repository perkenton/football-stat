import { useNavigate, useLocation } from 'react-router-dom';
import { TeamRepository } from './TeamRepository';
import { TeamType, Match, DatesFilter } from '../../../common/model';
import moment from 'moment';
import { AxiosError } from 'axios';
import showError from '../../../common/utils/showError';


export interface TeamPresenter {
  loading: boolean;
  teamId: string | null;
  getTeam(): Promise<TeamType>;
  getTeamsMatch(values?: DatesFilter): Promise<Match[]>;
  historyPush(values: DatesFilter): void;
  resetFilter(): void;
}

export class TeamPresenterImpl implements TeamPresenter {
  constructor(private teamRepositoryImpl: TeamRepository) {}
  private location = useLocation();
  private navigate = useNavigate();

  public loading: boolean = false;
  public teamId: string | null = new URLSearchParams(this.location.search).get('teamId');

  private dateFrom: string | null = new URLSearchParams(this.location.search).get('dateFrom');
  private dateTo: string | null = new URLSearchParams(this.location.search).get('dateTo');

  async getTeam(): Promise<TeamType> {
    this.loading = true;

    const response = await this.teamRepositoryImpl.getTeam(`teams/${this.teamId}`)
      .then((res) => {
        return res.data;
      })
      .catch((error: AxiosError) => {
        console.error('getTeam error: ', error);
        showError(error);
      });
    this.loading = false;

    return response;
  }

  async getTeamsMatch(values?: DatesFilter): Promise<Match[]> {
    this.loading = true;
    let dateFilterFrom;
    let dateFilterTo;

    if(values) {
      dateFilterFrom = values.dateFrom && this.formatDate(values.dateFrom);
      dateFilterTo = values.dateTo && this.formatDate(values.dateTo);
    } else if(this.dateFrom || this.dateTo) {
      dateFilterFrom = this.dateFrom;
      dateFilterTo = this.dateTo;
    }
    const filters = this.getFilters(dateFilterFrom, dateFilterTo);

    const response = await this.teamRepositoryImpl.getTeam(`teams/${this.teamId}/${filters}`)
      .then((res) => {
        return res.data.matches;
      })
      .catch((error: AxiosError) => {
        console.error('getTeamsMatch error: ', error);
        showError(error);
      });
    this.loading = false;

    return response;
  }

  getFilters(from?: string | null, to?: string | null): string {
    const dateFrom = from ? `dateFrom=${from}` : '';
    const dateTo = to ? `&dateTo=${to}` : '';

    return `matches?${dateFrom}${dateTo}`;
  }

  private formatDate(date: moment.Moment): string {
    return moment(date).format('YYYY-MM-DD');
  }

  historyPush(values: DatesFilter): void {
    const from = values.dateFrom && this.formatDate(values.dateFrom);
    const to = values.dateTo && this.formatDate(values.dateTo);

    const dateFrom = from ? `&dateFrom=${from}` : '';
    const dateTo = to ? `&dateTo=${to}` : '';

    const filters = `${dateFrom}${dateTo}`
    const url = `/team?teamId=${this.teamId}${filters}`;

    this.navigate(url);
  }

  resetFilter(): void {
    this.dateFrom = null;
    this.dateTo = null;
    this.navigate(`/team?teamId=${this.teamId}`);
  }

}