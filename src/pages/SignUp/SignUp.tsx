import BottomButton from '@src/components/design-system/button/BottomButton/BottomButton';
import { useSignUp } from '@src/services/auth/signUp';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import backIcon from './assets/back.svg';
import styles from './SignUp.module.css';
const SignUp = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const { mutateAsync } = useSignUp();
  const signUp = async () => {
    try {
      if (password.length < 8) {
        setAlert('비밀번호는 8자 이상이어야 합니다.');
        return;
      }
      setAlert('');
      await mutateAsync({
        userId: id,
        password: password,
        nickname: name,
      });
      toast.success('회원가입 성공!');
      navigate('/sign-in');
    } catch (e) {
      toast.error('회원가입에 실패했어요.');
    }
  };
  const disabled =
    !name ||
    !id ||
    !password ||
    !passwordConfirm ||
    password !== passwordConfirm;
  return (
    <div className={styles.Container}>
      <button className={styles.BackButton} onClick={goBack}>
        <img src={backIcon} />
      </button>
      <p className={styles.Title}>회원가입</p>
      <div className={styles.Inputs}>
        <input
          className={styles.Input}
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={styles.Input}
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className={styles.Inputs}>
        <input
          className={styles.Input}
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={styles.Input}
          placeholder="비밀번호 확인"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <p className={styles.Alert}>{alert}</p>
      </div>
      <div className={styles.ButtonWrapper}>
        <BottomButton
          text="회원가입"
          black
          disabled={disabled}
          onClick={signUp}
        />
      </div>
    </div>
  );
};

export default SignUp;
