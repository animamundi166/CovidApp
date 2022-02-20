import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getCountryInfo, { ICountryInfo } from "../../api/getCountryInfo";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { PageHeader, Radio, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import style from './CountryInfo.module.scss';


const CountryInfo: FC = () => {
  const [countryInfo, setCountryInfo] = useState<ICountryInfo[] | null>(null);
  const [statValue, setStatValue] = useState("Active");
  const { countryCode } = useParams();
  const navigate = useNavigate();

  const fetchCountryInfo = async () => {
    setCountryInfo(null);
    const newCountryInfo = await getCountryInfo(countryCode!);
    setCountryInfo(newCountryInfo);
  };

  const onChange = (event: any) => {
    setStatValue(event.target.value);
  };

  const handleMainPageClick = () => {
    navigate('/')
  };

  useEffect(() => {
    fetchCountryInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode]);

  const countryCodelowCase = countryCode!.toLowerCase();

  return (
    <>
      {!countryInfo && <div className={style.spin}><Spin indicator={<LoadingOutlined spin style={{ fontSize: 30 }} />} /></div>}
      {countryInfo && (
        <div>
          <div>
            <PageHeader
              onBack={handleMainPageClick}
              title="Main Page"
            />
          </div>
          <div className={style.descriptionInfo}>
            <div className={style.info}>
              <div>
                <img src={`https://flagcdn.com/${countryCodelowCase}.svg`}
                  width="100"
                  alt={countryCode}
                />
              </div>
              <p className={style.countrydescription}>{countryInfo![0].Country}</p>
            </div>

            <div>
              <Radio.Group onChange={onChange} value={statValue}>
                <Radio value={"Deaths"}>Deaths</Radio>
                <Radio value={"Active"}>Active</Radio>
                <Radio value={"Confirmed"}>Confirmed</Radio>
              </Radio.Group>
            </div>

            <AreaChart
              width={700}
              height={400}
              data={countryInfo}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey={statValue} stackId="1" stroke="#FF0000" fill="#FF2A00" />
            </AreaChart>

          </div>
        </div>
      )}
    </>
  )
};

export default CountryInfo;
