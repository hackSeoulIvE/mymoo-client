import { useNavigate } from 'react-router-dom';

import styles from './MenuCard.module.css';

type MenuCardProps = {
  id: number;
  imageUrl: string;
  name: string;
  shop: string;
  price: string;
};
const MenuCard = ({ id, imageUrl, name, shop, price }: MenuCardProps) => {
  const navigate = useNavigate();
  const goToMenu = () => {
    navigate(`/menu/${id}`);
  };
  return (
    <div className={styles.Container} onClick={goToMenu}>
      <div className={styles.ImageWrapper}>
        <img className={styles.Image} src={imageUrl} />
      </div>
      <div className={styles.Right}>
        <div className={styles.Title}>{name}</div>
        <div className={styles.Shop}>{shop}</div>
        <p className={styles.Price}>{price}</p>
      </div>
    </div>
  );
};

export default MenuCard;
