import { usePostComment } from '@src/services/comment/postComment';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import styles from './WriteReviewModal.module.css';

type WriteReviewModalProps = {
  id: number;
  close: () => void;
};
const WriteReviewModal = ({ id, close }: WriteReviewModalProps) => {
  const [review, setReview] = useState('');
  const { mutateAsync } = usePostComment();
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    await mutateAsync({
      description: review,
      foodStoreId: id,
    });
    setReview('');
    queryClient.invalidateQueries({
      queryKey: ['store'],
    });
    close();
  };
  return (
    <div className={styles.Container}>
      <textarea
        className={styles.Textarea}
        placeholder="리뷰를 작성해주세요"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button className={styles.Button} onClick={handleSubmit}>
        등록하기
      </button>
    </div>
  );
};

export default WriteReviewModal;
