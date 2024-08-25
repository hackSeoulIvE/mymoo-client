import styles from './BottomButton.module.css';

type BottomButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  black?: boolean;
};
const BottomButton = ({
  text,
  onClick,
  disabled,
  black,
}: BottomButtonProps) => {
  return (
    <button
      className={`${styles.Container} ${black ? styles.Black : styles.Primary}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default BottomButton;
