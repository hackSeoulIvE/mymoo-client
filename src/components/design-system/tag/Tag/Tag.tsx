import styles from './Tag.module.css';
type TagProps = {
  text: string;
  color: string;
};
const Tag = ({ text, color }: TagProps) => {
  return (
    <div
      className={styles.Container}
      style={{
        backgroundColor: color + '22',
      }}
    >
      <p
        className={styles.Text}
        style={{
          color: color,
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default Tag;
