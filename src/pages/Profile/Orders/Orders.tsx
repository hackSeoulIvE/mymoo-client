import MenuCard from '@src/pages/Profile/Orders/components/MenuCard/MenuCard';
import { useGetUserOrder } from '@src/services/users/getUserOrder';
import { useNavigate } from 'react-router-dom';

import backIcon from './assets/back.svg';
import styles from './Orders.module.css';
const Orders = () => {
  const navigate = useNavigate();
  const { data, isPending, isSuccess } = useGetUserOrder();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles.Container}>
      <div className={styles.TopBar}>
        <button className={styles.BackButton} onClick={goBack}>
          <img src={backIcon} />
        </button>
        <p className={styles.Title}>주문 내역</p>
        <p className={styles.Count}>총 {data?.length ?? 0}건</p>
      </div>
      <div className={styles.Contents}>
        {isSuccess
          ? data.map((order) => (
              <MenuCard
                key={order.id}
                id={order.food.id}
                imageUrl={order.food.image_url}
                name={order.food.name}
                shop={order.food.foodstore.name}
                price={order.food.discount_price}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Orders;
