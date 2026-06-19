import axios from "axios";
import type { Country } from "../types/types";

const BASE_URL = "/api/countries";
const EXCLUDED_COUNTRY_NAMES = new Set(["abkhazia"]);

type CurrencyMap = NonNullable<Country["currencies"]>;
type LanguageMap = NonNullable<Country["languages"]>;

type RawCountry = {
  names?: {
    common?: string;
    official?: string;
  };
  codes?: {
    alpha_3?: string;
  };
  flag?: {
    url_png?: string;
    url_svg?: string;
  };
  capitals?: Array<{
    name?: string;
  }>;
  region?: string;
  subregion?: string;
  population?: number;
  tlds?: string[];
  currencies?: Array<{
    code?: string;
    name?: string;
    symbol?: string;
  }>;
  languages?: Array<{
    iso639_3?: string;
    name?: string;
  }>;
  borders?: string[];
};

const normalizeCountriesResponse = (payload: unknown): RawCountry[] => {
  if (Array.isArray(payload)) {
    return payload as RawCountry[];
  }

  if (Array.isArray((payload as { data?: unknown })?.data)) {
    return (payload as { data: RawCountry[] }).data;
  }

  if (Array.isArray((payload as { data?: { objects?: unknown } })?.data?.objects)) {
    return (payload as { data: { objects: RawCountry[] } }).data.objects;
  }

  throw new Error("Unexpected countries API response format");
};

const normalizeCurrencies = (currencies?: RawCountry["currencies"]) => {
  if (!currencies?.length) {
    return undefined;
  }

  return currencies.reduce<CurrencyMap>((result, currency) => {
    if (!currency.code || !currency.name) {
      return result;
    }

    result[currency.code] = {
      name: currency.name,
      symbol: currency.symbol ?? "",
    };
    return result;
  }, {});
};

const normalizeLanguages = (languages?: RawCountry["languages"]) => {
  if (!languages?.length) {
    return undefined;
  }

  return languages.reduce<LanguageMap>((result, language) => {
    if (!language.name) {
      return result;
    }

    const key = language.iso639_3 || language.name;
    result[key] = language.name;
    return result;
  }, {});
};

const normalizeCountry = (country: RawCountry): Country => ({
  cca3: country.codes?.alpha_3 ?? "",
  name: {
    common: country.names?.common ?? "Unknown",
    official: country.names?.official ?? country.names?.common ?? "Unknown",
  },
  flags: {
    png: country.flag?.url_png,
    svg: country.flag?.url_svg,
  },
  capital: country.capitals
    ?.map((capital) => capital.name)
    .filter((capital): capital is string => Boolean(capital)),
  region: country.region ?? "",
  subregion: country.subregion,
  population: country.population ?? 0,
  tld: country.tlds,
  currencies: normalizeCurrencies(country.currencies),
  languages: normalizeLanguages(country.languages),
  borders: country.borders,
});

const shouldIncludeCountry = (country: Country) => {
  return !EXCLUDED_COUNTRY_NAMES.has(country.name.common.trim().toLowerCase());
};

export const getCountries = async (): Promise<Country[]> => {
  const response = await axios.get(BASE_URL);
  return normalizeCountriesResponse(response.data)
    .map(normalizeCountry)
    .filter(shouldIncludeCountry);
};

export const getCountryByCode = async (code: string): Promise<Country | null> => {
  const countries = await getCountries();
  return countries.find((country) => country.cca3 === code) ?? null;
};
