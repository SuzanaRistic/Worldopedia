export interface Country {
    cca3: string;
    name: { common: string, nativeName: { [key: string]: { official: string } } };
    capital?: string[];
    region: string;
    subregion?: string;
    population: number;
    area: number;
    timezones: string[];
    borders?: string[];
    flags: { png: string };
    languages?: { [key: string]: string };
    currencies?: { [key: string]: { name: string, symbol: string } };
  }