import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from './NotFound.module.scss';

const NotFound = () => {

  const navigate = useNavigate();

  const handleMainPageClick = () => {
    navigate('/')
  };

  return (
    <div className={style.notFound}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={handleMainPageClick} type="primary">Back Home</Button>}
      />
    </div>
  )
}

export default NotFound;
