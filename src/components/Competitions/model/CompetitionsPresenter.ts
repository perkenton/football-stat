import { CompetitionsRepository } from './CompetitionsRepository';
import { CompetitionType } from '../../../common/model';
import { useLocation } from 'react-router-dom';


export interface CompetitionsPresenter {
  getCompetitions(): Promise<CompetitionType[]>;
  searchCompetitions(request: string): CompetitionType[];
  clearSearchRequest(): void;
}

export class CompetitionsPresenterImpl implements CompetitionsPresenter {
  constructor(private competitionsRepository: CompetitionsRepository) {}
  private competitions: CompetitionType[] = [];
  private searchResult: CompetitionType[] = [];
  private location = useLocation();
  private searchRequest: string | null = new URLSearchParams(this.location.search).get('search');

  async getCompetitions(): Promise<CompetitionType[]> {
    this.competitions = await this.competitionsRepository.getCompetitions()
      .then((res) => {
        return res.data.competitions;
    })
      .catch((error) => {
        console.log('getCompetitions error', error);
      });
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

  searchCompetitions(request: string): CompetitionType[] {
    this.searchResult = this.competitions.filter((item) => item.name.toLowerCase().includes(request));
    return this.searchResult;
  }

  clearSearchRequest() {
    this.searchRequest = null;
  }
}