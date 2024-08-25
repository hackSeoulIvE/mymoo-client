import BottomButton from '@src/components/design-system/button/BottomButton/BottomButton';
import Loading from '@src/pages/loading/Loading';
import { useGetFood } from '@src/services/food/getFood';
import { useNavigate, useParams } from 'react-router-dom';

import backIcon from './assets/back.svg';
import styles from './Menu.module.css';

const Menu = () => {
  const navigate = useNavigate();
  const { menuId } = useParams();
  const { data, isPending, isSuccess } = useGetFood({
    id: Number(menuId),
  });
  if (isPending) return <Loading />;
  if (!isSuccess) return null;
  const imageUrl = data.image_url;
  const name = data.name;
  const beforeSaleText = data.price;
  const afterSaleText = data.discount_price;
  const description = data.description;
  const goBack = () => {
    navigate(-1);
  };
  const moveToPay = () => {
    navigate(`/pay/${menuId}?price=${afterSaleText}`);
  };
  return (
    <div className={styles.Container}>
      <div className={styles.ImageWrapper}>
        <img className={styles.Image} src={imageUrl} />
      </div>
      <div className={styles.TopBar} />
      <button className={styles.BackButton} onClick={goBack}>
        <img src={backIcon} />
      </button>
      <div className={styles.Contents}>
        <div className={styles.Top}>
          <p className={styles.Name}>{name}</p>
          <div className={styles.PriceTexts}>
            <p className={styles.BeforeSaleText}>{beforeSaleText}</p>
            <p className={styles.AfterSaleText}>{afterSaleText}</p>
          </div>
          <div className={styles.Description}>{description}</div>
        </div>
        <div className={styles.BottomButtonWrapper}>
          <BottomButton text="예약하기" onClick={moveToPay} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
