import axios from "axios";

export interface ICountryInfo {
  Country: string;
  Confirmed: number;
  Deaths: number;
  Active: number;
  Date: string;
}

const getCountryInfo = async (countryCode: string): Promise<ICountryInfo[]> => {
  const response = await axios.get<ICountryInfo[]>(`https://api.covid19api.com/total/country/${countryCode}`);
  const items = response.data;
  return items.map((item) => ({
    Country: item.Country,
    Confirmed: item.Confirmed,
    Deaths: item.Deaths,
    Active: item.Active,
    Date: item.Date.substring(0, 10).split("-").reverse().join("."),
  }))
};

export default getCountryInfo;
