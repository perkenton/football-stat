import { CompetitionsRepository } from './CompetitionsRepository';
import { CompetitionType } from '../../../common/model';
import { useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import showError from '../../../common/utils/showError';


export interface CompetitionsPresenter {
  loading: boolean;
  getCompetitions(): Promise<CompetitionType[]>;
  searchCompetitions(request: string): Promise<CompetitionType[]>;
  clearSearchRequest(): void;
}

export class CompetitionsPresenterImpl implements CompetitionsPresenter {
  constructor(private competitionsRepository: CompetitionsRepository) {}
  public loading: boolean = false;
  private competitions: CompetitionType[] = [];
  private searchResult: CompetitionType[] = [];
  private location = useLocation();
  private searchRequest: string | null = new URLSearchParams(this.location.search).get('search');

  async getCompetitions(): Promise<CompetitionType[]> {
    this.loading = true;
    this.competitions = await this.competitionsRepository.getCompetitions()
      .then((res) => {
        return res.data.competitions;
      })
      .catch((error: AxiosError) => {
        console.error('getCompetitions error: ', error);
        showError(error);
      });
    this.loading = false;
    if(this.searchRequest) return this.competitions.filter((item) => this.searchRequest && item.name.toLowerCase().includes(this.searchRequest));
    return this.competitions;
  }

  // TODO: настроить поиск через onChange с отложенным выполнением
  // private debounce(callback: any, value: string, delay: number) {
  //   clearTimeout(this.timer);
  //   return this.timer = setTimeout(callback(value), delay);
  // }
  // debounceSearch(val: string) {
  //   this.debounce((val: string) => this.searchCompetitions, val, 1000)
  // }

  async searchCompetitions(request: string): Promise<CompetitionType[]> {
    this.clearSearchRequest()
    await this.getCompetitions();
    this.searchResult = this.competitions.filter((item) => item.name.toLowerCase().includes(request));
    return this.searchResult;
  }

  clearSearchRequest() {
    this.searchRequest = null;
  }
}