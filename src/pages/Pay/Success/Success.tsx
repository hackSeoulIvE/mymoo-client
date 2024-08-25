import BottomButton from '@src/components/design-system/button/BottomButton/BottomButton';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';

import loadingSuccess from './assets/loading-success.json';
import styles from './Success.module.css';

const Success = () => {
  const navigate = useNavigate();
  const [isButtonClickable, setIsButtonClickable] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonClickable(true);
    }, 2000); // 2-second delay

    return () => clearTimeout(timer);
  }, []);

  const moveToHome = () => {
    if (isButtonClickable) {
      navigate('/home');
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Contents}>
        <Lottie
          options={{
            loop: false,
            autoplay: true,
            animationData: loadingSuccess,
          }}
          height={108}
          width={108}
        />
        <motion.p
          className={styles.Text}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          결제 완료!
        </motion.p>
      </div>
      <motion.div
        className={styles.ButtonWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <BottomButton
          text="홈으로"
          onClick={moveToHome}
          disabled={!isButtonClickable}
        />
      </motion.div>
    </div>
  );
};

export default Success;
