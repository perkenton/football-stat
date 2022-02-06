import { instance } from '../../../common/constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { CompetitionType, DatesFilter, Match, Team } from '../../../common/model';
import { CompetitionRepository } from './CompetitionRepository';
import moment from 'moment';


export interface CompetitionPresenter {
  loading: boolean;
  getCompetition(): Promise<CompetitionType>;
  getMatches(values?: DatesFilter): Promise<Match[]>;
  getTeams(): Promise<Team[]>;
  getFilters(from?: string | null, to?: string | null): string;
  historyPush(values: DatesFilter): void;
  resetFilter(): void;
}

export class CompetitionPresenterImpl implements CompetitionPresenter {
  constructor(private competitionRepository: CompetitionRepository) {}
  public loading: boolean = false;

  private location = useLocation();
  private navigate = useNavigate();
  private competitionId = new URLSearchParams(this.location.search).get('competitionId');
  private dateFrom: string | null = new URLSearchParams(this.location.search).get('dateFrom');
  private dateTo: string | null = new URLSearchParams(this.location.search).get('dateTo');


  async getCompetition(): Promise<CompetitionType> {
    this.loading = true;
    const response = await instance
      .get(`competitions/${this.competitionId}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log('getCompetition error', error);
      });
    this.loading = false;

    return response;
  }

  // TODO: унифицировать и упростить url
  async getMatches(values?: DatesFilter): Promise<Match[]> {
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

    const response = await instance
      .get(`competitions/${this.competitionId}/${filters}`)
      .then((res) => {
        return res.data.matches;
      })
      .catch((error) => {
        console.log('getMatches error', error);
      });
    this.loading = false;

    return response;
  }

  async getTeams(): Promise<Team[]> {
    this.loading = true;
    const response = await instance
      .get(`competitions/${this.competitionId}/teams`)
      .then((res) => {
        return res.data.teams;
      })
      .catch((error) => {
        console.log('getTeams error', error);
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
    const url = `/competition?competitionId=${this.competitionId}${filters}`;

    this.navigate(url);
  }

  resetFilter(): void {
    this.dateFrom = null;
    this.dateTo = null;
    this.navigate(`/competition?competitionId=${this.competitionId}`);
  }
}