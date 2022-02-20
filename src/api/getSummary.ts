import axios from 'axios';

export interface IBaseCountry {
  Country: string;
  CountryCode: string,
  TotalConfirmed: number;
  TotalDeaths: number;
  ID: string;
}

export interface IBaseGetSummary {
  Global: {
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    Date: string;
  };
  Countries: IBaseCountry[];
}

const getSummary = async (): Promise<IBaseGetSummary> => {
  const response = await axios.get<IBaseGetSummary>(`https://api.covid19api.com/summary`);
  return response.data;
};

export default getSummary;
