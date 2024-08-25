import { useNavigate } from 'react-router-dom';

import styles from './Error.module.css';
type ErrorProps = {
  error: Error;
  resetErrorBoundary: () => void;
  fullScreen?: boolean;
};
const Error = ({ error, resetErrorBoundary, fullScreen }: ErrorProps) => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/home');
  };
  return (
    <div
      className={styles.Container}
      style={{
        width: fullScreen ? '100vw' : '100%',
        height: fullScreen ? '100svh' : '100%',
        position: fullScreen ? 'fixed' : 'relative',
        left: fullScreen ? 0 : 'auto',
        top: fullScreen ? 0 : 'auto',
      }}
    >
      <p className={styles.Text}>Something went wrong :(</p>
      <div className={styles.Buttons}>
        <button onClick={resetErrorBoundary} className={styles.Button}>
          Back
        </button>
        <button onClick={goHome} className={styles.Button}>
          Home
        </button>
      </div>
    </div>
  );
};

export default Error;
