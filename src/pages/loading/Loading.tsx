import loadingJson from '@src/assets/loading.json';
import Lottie from 'react-lottie';

import styles from './Loading.module.css';
const Loading = () => {
  return (
    <div className={styles.Container}>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: loadingJson,
        }}
        width={80}
        height={80}
      />
    </div>
  );
};

export default Loading;
