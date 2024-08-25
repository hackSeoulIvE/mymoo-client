import Tag from '@src/components/design-system/tag/Tag/Tag';
import { useNavigate } from 'react-router-dom';

import styles from './ShopCard.module.css';

type ShopCardProps = {
  name: string;
  available: boolean;
  tag: string;
  id: number;
};
const ShopCard = ({ name, available, tag, id }: ShopCardProps) => {
  const navigate = useNavigate();
  const moveToShop = () => {
    navigate(`/shop/${id}`);
  };
  return (
    <div
      className={styles.Container}
      style={{
        opacity: available ? 1 : 0.5,
      }}
      onClick={moveToShop}
    >
      <p className={styles.Title}>{name}</p>
      <div className={styles.Tags}>
        {available ? (
          <Tag text="주문 가능" color="#40AE65" />
        ) : (
          <Tag text="주문 불가" color="#DB4040" />
        )}
        <Tag text={tag} color="#4F5350" />
      </div>
    </div>
  );
};

export default ShopCard;
