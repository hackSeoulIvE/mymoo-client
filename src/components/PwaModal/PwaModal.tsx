import styles from './PwaModal.module.css';

type PwaModalProps = {
  isDeviceIOS: boolean;
  onOk: () => void;
  onCancel: () => void;
};
const PwaModal = ({ isDeviceIOS, onOk, onCancel }: PwaModalProps) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Modal}>
        <p className={styles.Title}>더 편하게 사용하시려면 앱을 설치하세요.</p>
        {isDeviceIOS ? (
          <p className={styles.Title}>
            하단 공유 버튼을 통해 홈화면에 추가하시면 돼요.
          </p>
        ) : (
          <button className={styles.Button} onClick={onOk}>
            PWA 설치하기
          </button>
        )}
        <button
          className={styles.Cancel}
          onClick={() => {
            if (isDeviceIOS) {
              sessionStorage.setItem('ios-pwa-later', 'true');
            }
            onCancel();
          }}
        >
          나중에
        </button>
      </div>
    </div>
  );
};

export default PwaModal;
