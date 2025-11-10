import axios from "axios";
import type { Country } from "../types/types";

const BASE_URL = "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,subregion,cca3";

export const getCountries = async (): Promise<Country[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
