import { useNavigate, useLocation } from 'react-router-dom';
import { CompetitionType, DatesFilter, Match, TeamType } from '../../../common/model';
import { CompetitionRepository } from './CompetitionRepository';
import moment from 'moment';
import { AxiosError } from 'axios';
import showError from '../../../common/utils/showError';


export interface CompetitionPresenter {
  loading: boolean;
  competitionId: string | null;
  getCompetition(): Promise<CompetitionType>;
  getMatches(values?: DatesFilter): Promise<Match[]>;
  getTeams(): Promise<TeamType[]>;
  getFilters(from?: string | null, to?: string | null): string;
  historyPush(values: DatesFilter): void;
  resetFilter(): void;
  searchTeams(request: string): Promise<TeamType[]>;
  clearSearchRequest(): void;
  resetSearch(): void;
}

export class CompetitionPresenterImpl implements CompetitionPresenter {
  constructor(private competitionRepository: CompetitionRepository) {}
  private location = useLocation();
  private navigate = useNavigate();

  public loading: boolean = false;
  public competitionId: string | null = new URLSearchParams(this.location.search).get('competitionId');

  private team: TeamType[] = [];
  private dateFrom: string | null = new URLSearchParams(this.location.search).get('dateFrom');
  private dateTo: string | null = new URLSearchParams(this.location.search).get('dateTo');
  private searchRequest: string | null = new URLSearchParams(this.location.search).get('search');


  async getCompetition(): Promise<CompetitionType> {
    this.loading = true;
    const response = await this.competitionRepository.getCompetition(`competitions/${this.competitionId}`)
      .then((res) => {
        return res.data;
      })
      .catch((error: AxiosError) => {
        console.error('getCompetition error: ', error);
        showError(error);
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

    const response = await this.competitionRepository.getMatches(`competitions/${this.competitionId}/${filters}`)
      .then((res) => {
        return res.data.matches;
      })
      .catch((error: AxiosError) => {
        console.error('getMatches error: ', error);
        showError(error);
      });
    this.loading = false;

    return response;
  }

  async getTeams(): Promise<TeamType[]> {
    this.loading = true;
    this.team = await this.competitionRepository.getTeams(`competitions/${this.competitionId}/teams`)
      .then((res) => {
        return res.data.teams;
      })
      .catch((error: AxiosError) => {
        console.error('getTeams error: ', error);
        showError(error);
      });
    this.loading = false;
    if(this.searchRequest) return this.team.filter((item) => this.searchRequest && item.name.toLowerCase().includes(this.searchRequest));
    return this.team;
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

  async searchTeams(request: string): Promise<TeamType[]> {
    this.clearSearchRequest();
    await this.getTeams();
    return this.team.filter((item) => item.name.toLowerCase().includes(request));
  }

  clearSearchRequest() {
    this.searchRequest = null;
  }

  resetSearch(): void {
    this.clearSearchRequest();
    this.navigate(`/competition?competitionId=${this.competitionId}`);
  }
}