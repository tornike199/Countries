import axios from "axios";
import type { Country } from "../types/types";

const BASE_URL = "http://localhost:8000";

export const getCountries = async (): Promise<Country[]> => {
  const response = await axios.get<Country[]>(`${BASE_URL}/countries`);
  return response.data;
};
