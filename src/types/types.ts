export interface Country {
  cca3: string;
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  flags: {
    png?: string;
    svg?: string;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  tld?: string[];
  currencies?: Record<string, { name: string; symbol: string }>;
  languages?: Record<string, string>;
  borders?: string[];
}
