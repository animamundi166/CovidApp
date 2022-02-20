import { FC, useEffect, useState } from 'react';
import getSummary, { IBaseGetSummary } from './api/getSummary';
import { useNavigate } from 'react-router-dom';
import style from './App.module.scss';
import { Select, Button, Spin, message, Statistic, Divider, Tabs } from 'antd';
import { LoadingOutlined, ClockCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const App: FC = () => {
  const [countries, setCountries] = useState<IBaseGetSummary | null>(null);
  const [countryCode, setcountryCode] = useState('');
  const navigate = useNavigate();
  const { Option } = Select;
  const { TabPane } = Tabs;

  const fetchSummary = async () => {
    const response = await getSummary();
    setCountries(response);
  };

  const handleChange = (code: string) => {
    setcountryCode(code);
  }

  const error = () => {
    message.error('Please select a country');
  };

  const handleOnClick = (countryCode: string) => {
    if (countryCode) {
      navigate(`/countries/${countryCode}`);
    } else { error() }
  }

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className={style.main}>
      {!countries && <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />}
      {countries && (
        <>
          <div>
            <Select
              defaultValue="Select a Country"
              style={{ width: 300 }}
              onChange={handleChange}>

              {countries.Countries.map((country) => (
                <Option
                  key={country.ID}
                  value={country.CountryCode}>
                  <img className={style.img}
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${country.CountryCode.toLowerCase()}.jpg`}
                    srcSet={`https://flagcdn.com/w40/${country.CountryCode.toLowerCase()}.png 2x`}
                    alt={country.Country}
                  />
                  {country.Country}
                </Option>
              ))}
            </Select>
            <Button onClick={() => handleOnClick(countryCode)} type="primary">Show Info</Button>
          </div>

          <div style={{ marginTop: 60 }}>
            <Statistic style={{ paddingLeft: 100 }}
              title="Info updated:"
              value={countries.Global.Date.substring(0, 10).split("-").reverse().join(".")}
              prefix={<ClockCircleOutlined />} />
            <Divider />
            <Tabs
              size="large"
              tabPosition="left"
              style={{ width: 400, fontSize: 22 }}>
              <TabPane tab="New Confirmed:" key="1">
                {countries.Global.NewConfirmed}
              </TabPane>
              <TabPane tab="Total Confirmed" key="2">
                {countries.Global.TotalConfirmed}
              </TabPane>
              <TabPane tab="New Deaths" key="3">
                {countries.Global.NewDeaths}
              </TabPane>
              <TabPane tab="Total Deaths" key="4">
                {countries.Global.TotalDeaths}
              </TabPane>
            </Tabs>
            <Divider />
          </div>
        </>
      )}
    </div>)
}

export default App;
