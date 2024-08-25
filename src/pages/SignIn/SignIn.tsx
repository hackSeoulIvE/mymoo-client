import logo from '@src/assets/logo.png';
import BottomButton from '@src/components/design-system/button/BottomButton/BottomButton';
import { useSignIn } from '@src/services/auth/signIn';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import styles from './SignIn.module.css';
const SignIn = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { mutateAsync } = useSignIn();
  const signIn = async () => {
    try {
      await mutateAsync({
        userId: id,
        password: password,
      });
      navigate('/home');
      toast.success('로그인 성공!');
    } catch (e) {
      toast.error('로그인에 실패했어요.');
    }
  };
  const moveToSignup = () => {
    navigate('/sign-up');
  };
  return (
    <div className={styles.Container}>
      <img src={logo} className={styles.Logo} />
      <div className={styles.Inputs}>
        <input
          className={styles.Input}
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          className={styles.Input}
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>
          <p className={styles.NoAccount} onClick={moveToSignup}>
            계정이 없으신가요?
          </p>
        </button>
      </div>
      <div className={styles.ButtonWrapper}>
        <BottomButton text="로그인" black onClick={signIn} />
      </div>
    </div>
  );
};

export default SignIn;
