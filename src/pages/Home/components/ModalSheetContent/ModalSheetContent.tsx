import MenuCard from '@src/components/common/MenuCard/MenuCard';
import Tag from '@src/components/design-system/tag/Tag/Tag';
import { useGetStore } from '@src/services/store/getStore';
import { useNavigate } from 'react-router-dom';

import styles from './ModalSheetContent.module.css';

type ModalSheetContentProps = {
  shopId: number | null;
};
const ModalSheetContent = ({ shopId }: ModalSheetContentProps) => {
  const navigate = useNavigate();
  if (shopId === null) return null;
  const { data, isPending, isSuccess } = useGetStore({
    id: shopId,
  });

  const moveToShop = () => {
    navigate(`/shop/${shopId}`);
  };
  if (!isSuccess) return null;

  const description = `주문 가능 시간 : ${data.start_Time} ~ ${data.end_Time}`;
  return (
    <div className={styles.Container}>
      <div className={styles.Top} onClick={moveToShop}>
        <p className={styles.Title}>{data.name}</p>
        <p className={styles.Description}>{description}</p>
        <div className={styles.Tags}>
          {data.is_open ? (
            <Tag text="주문 가능" color="#40AE65" />
          ) : (
            <Tag text="주문 불가" color="#DB4040" />
          )}
          <Tag text={data.store_type} color="#4F5350" />
        </div>
      </div>
      <div className={styles.Menus}>
        {data.foods.slice(0, 3).map((food) => (
          <MenuCard
            key={food.id}
            id={food.id}
            name={food.name}
            imageUrl={food.image_url}
            beforeSalePrice={food.price}
            afterSalePrice={food.discount_price}
          />
        ))}
      </div>
    </div>
  );
};

export default ModalSheetContent;
