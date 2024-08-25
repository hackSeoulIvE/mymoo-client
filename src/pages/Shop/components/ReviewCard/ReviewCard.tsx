import styles from './ReviewCard.module.css';

type ReviewCardProps = {
  name: string;
  text: string;
};
const ReviewCard = ({ name, text }: ReviewCardProps) => {
  return (
    <div className={styles.Container}>
      <p className={styles.Name}>{name}</p>
      <p className={styles.Text}>{text}</p>
    </div>
  );
};

export default ReviewCard;
