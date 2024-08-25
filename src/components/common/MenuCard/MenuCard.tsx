import { useNavigate } from 'react-router-dom';

import styles from './MenuCard.module.css';

type MenuCardProps = {
  id: number;
  imageUrl: string;
  name: string;
  beforeSalePrice: string;
  afterSalePrice: string;
};
const MenuCard = ({
  id,
  imageUrl,
  name,
  beforeSalePrice,
  afterSalePrice,
}: MenuCardProps) => {
  const navigate = useNavigate();
  const moveToMenu = (menuId: number) => {
    navigate(`/menu/${menuId}`);
  };
  return (
    <div
      className={styles.Container}
      onClick={() => {
        moveToMenu(id);
      }}
    >
      <div className={styles.ImageWrapper}>
        <img className={styles.Image} src={imageUrl} />
      </div>
      <div className={styles.Right}>
        <div className={styles.Title}>{name}</div>
        <div className={styles.BottomTexts}>
          <p className={styles.BeforeSaleText}>{beforeSalePrice}</p>
          <p className={styles.AfterSaleText}>{afterSalePrice}</p>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
