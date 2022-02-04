
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

export type Competition = {
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