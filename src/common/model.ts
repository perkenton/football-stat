import moment from 'moment';

export type Area = {
  id: number,
  name: string
  countryCode?: string,
  ensignUrl?: string,
}

export enum Plan {
  TIER_ONE = 'TIER_ONE',
}

export type Winner = {
  id: number,
  name: string,
  shortName: string,
  tla: string,
  crestUrl: string,
}

export type Season = {
  id: number,
  startDate: string,
  endDate: string,
  currentMatchday: number,
  winner?: Winner,
}

export type CompetitionType = {
  id: number,
  area: Area,
  name: string,
  code?: string,
  emblemUrl?: string,
  plan: Plan,
  currentSeason: Season,
  seasons: Season[],
  numberOfAvailableSeasons?: number,
  lastUpdated: string,
}

export enum MatchStatus {
  SCHEDULED = 'SCHEDULED',
  LIVE = 'LIVE',
  IN_PLAY = 'IN_PLAY',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED',
  POSTPONED = 'POSTPONED',
  SUSPENDED = 'SUSPENDED',
  CANCELED = 'CANCELED',
}

export type MatchOdds = {
  msg: string,
}

export type Score = {
  homeTeam: number | null,
  awayTeam: number | null,
}

export type MatchTeam = {
  id: number,
  name: string,
}

export type Referee = {
  id: number,
  name: string,
  role: string,
  nationality: string,
}

export type MatchScore = {
  winner: string,
  duration: string,
  fullTime: Score,
  halfTime: Score,
  extraTime: Score,
  penalties: Score,
}

export type Match = {
  id: number,
  season: Season,
  utcDate: string,
  status: MatchStatus,
  matchday: number,
  stage: string,
  group?: any,
  lastUpdated: string,
  odds: MatchOdds,
  score: MatchScore,
  homeTeam: MatchTeam,
  awayTeam: MatchTeam,
  referees: Referee[],
}

export type Team = {
  id: number,
  area: Area,
  name: string,
  shortName: string,
  tla: string,
  crestUrl: string,
  address: string,
  phone: string,
  website: string,
  email: string,
  founded: number,
  clubColors: string,
  venue: string,
  lastUpdated: string,
}

export type DatesFilter = {
  dateFrom?: moment.Moment,
  dateTo?: moment.Moment,
}