import BottomButton from '@src/components/design-system/button/BottomButton/BottomButton';
import { usePostOrderFood } from '@src/services/food/postOrderFood';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import backIcon from './assets/back.svg';
import walletIcon from './assets/wallet.svg';
import styles from './Pay.module.css';
const Pay = () => {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { mutateAsync } = usePostOrderFood();
  const price = searchParams.get('price');
  const goBack = () => {
    navigate(-1);
  };
  const moveToPaySuccess = async () => {
    await mutateAsync({
      foodId: Number(menuId),
    });
    navigate('/pay/success');
  };
  return (
    <div className={styles.Container}>
      <button className={styles.BackButton} onClick={goBack}>
        <img src={backIcon} />
      </button>
      <div className={styles.Contents}>
        <div className={styles.Circle}>
          <img src={walletIcon} />
        </div>
        <p className={styles.PriceText}>{price}</p>
        <p className={styles.Description}>결제하시겠어요?</p>
      </div>
      <div className={styles.ButtonWrapper}>
        <BottomButton text="결제하기" onClick={moveToPaySuccess} />
      </div>
    </div>
  );
};

export default Pay;
