import MenuCard from '@src/components/common/MenuCard/MenuCard';
import Tag from '@src/components/design-system/tag/Tag/Tag';
import useModal from '@src/hooks/useModal';
import Loading from '@src/pages/loading/Loading';
import ReviewCard from '@src/pages/Shop/components/ReviewCard/ReviewCard';
import WriteReviewModal from '@src/pages/Shop/components/WriteReviewModal/WriteReviewModal';
import { useGetStore } from '@src/services/store/getStore';
import { useNavigate, useParams } from 'react-router-dom';

import backIcon from './assets/back.svg';
import styles from './Shop.module.css';

const Shop = () => {
  const navigate = useNavigate();
  const { shopId } = useParams();
  if (shopId === undefined) return undefined;
  const { data, isPending, isSuccess } = useGetStore({
    id: Number(shopId),
  });
  const {
    Modal,
    open: openWriteReviewModal,
    close: closeWriteReviewModal,
  } = useModal();
  const goBack = () => {
    navigate(-1);
  };

  if (isPending) return <Loading />;
  if (!isSuccess) return null;

  const description = `주문 가능 시간 : ${data.start_Time} ~ ${data.end_Time}`;
  return (
    <div className={styles.Container}>
      <Modal>
        <WriteReviewModal id={Number(shopId)} close={closeWriteReviewModal} />
      </Modal>
      <button>
        <img src={backIcon} onClick={goBack} />
      </button>
      <div className={styles.Top}>
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
        <div className={styles.MenuScroll}>
          {data.foods.map((food) => (
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
      <div className={styles.ReviewTop}>
        <p className={styles.ReviewTitle}>리뷰</p>
        <button
          className={styles.WriteReviewButton}
          onClick={openWriteReviewModal}
        >
          작성하기
        </button>
      </div>
      <div className={styles.Reviews}>
        <div className={styles.ReviewScroll}>
          {data.comments.length > 0 ? (
            data.comments.map((comment) => (
              <ReviewCard
                key={comment.id}
                name={comment.user.nickname}
                text={comment.description}
              />
            ))
          ) : (
            <p className={styles.NoReview}>리뷰가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
