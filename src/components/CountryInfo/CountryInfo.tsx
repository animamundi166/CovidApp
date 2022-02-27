import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { PageHeader, Radio, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import style from './CountryInfo.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getInfo } from "../../store/info";


const CountryInfo: FC = () => {
  const { countryCode } = useParams();

  const dispatch = useDispatch();
  const { countryInfo } = useSelector((state: RootState) => state.сountryInfo);

  const [statValue, setStatValue] = useState("Active");
  const navigate = useNavigate();

  const onChange = (event: any) => {
    setStatValue(event.target.value);
  };

  const handleMainPageClick = () => {
    navigate('/')
  };

  useEffect(() => {
    dispatch(getInfo(countryCode!));
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
