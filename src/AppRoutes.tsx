import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import CountryInfo from './components/CountryInfo/CountryInfo'
import NotFound from "./components/NotFound/NotFound";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/countries/:countryCode" element={<CountryInfo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
