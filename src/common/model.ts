
export type Area = {
  id: number,
  name: string
  countryCode: string,
  ensignUrl :string,
}

export enum Plan {
  TIER_ONE = 'TIER_ONE',
}

export type Season = {
  id: number,
  startDate: string,
  endDate: string,
  currentMatchday: number,
  winner?: string,
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
  numberOfAvailableSeasons: number,
  lastUpdated: string,
}