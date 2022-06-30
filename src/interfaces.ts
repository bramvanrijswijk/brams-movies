export interface Schedule {
  time: string;
  days: string[];
}

export interface Rating {
  average?: number;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}

export interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite: string;
}

export interface Country2 {
  name: string;
  code: string;
  timezone: string;
}

export interface WebChannel {
  id: number;
  name: string;
  country: Country2;
  officialSite: string;
}

export interface DvdCountry {
  name: string;
  code: string;
  timezone: string;
}

export interface Externals {
  tvrage: number;
  thetvdb?: number;
  imdb: string;
}

export interface Poster {
  medium: string;
  original: string;
}

export interface Self {
  href: string;
}

export interface Previousepisode {
  href: string;
}

export interface Nextepisode {
  href: string;
}

export interface Links {
  self: Self;
  previousepisode: Previousepisode;
  nextepisode: Nextepisode;
}

export interface TvShow {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime?: number;
  averageRuntime?: number;
  premiered: string;
  ended: string;
  officialSite: string;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network;
  webChannel: WebChannel;
  dvdCountry: DvdCountry;
  externals: Externals;
  image: Poster;
  summary: string;
  updated: number;
  _links: Links;
}

export interface Image {
  id: number;
  type: string;
  main: boolean;
  resolutions: {
    original: {
      url: string;
      width: number;
      height: number;
    }
  }
}

export interface ImagesByShow {
  tvShowId: number;
  images: Image[];
}
