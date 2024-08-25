import { useGetProfile } from '@src/services/auth/getProfile';
import { useSignOut } from '@src/services/auth/signOut';
import { useNavigate } from 'react-router-dom';

import styles from './Profile.module.css';
const Profile = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useSignOut();
  const { data, isPending, isSuccess } = useGetProfile();
  const moveToOrders = () => {
    navigate('/profile/orders');
  };
  const toastPreparing = () => {};

  const signOut = async () => {
    mutateAsync();
    navigate('/sign-in');
  };
  return (
    <div className={styles.Container}>
      <div className={styles.TopBar}>
        <p className={styles.Title}>내 정보</p>
      </div>
      <div className={styles.Contents}>
        <div className={styles.Profile}>
          <p className={styles.Name}>{isSuccess ? data.user_name : ''}</p>
          <p className={styles.Username}>{isSuccess ? data.user_id : ''}</p>
        </div>
        <div className={styles.Box}>
          <div className={styles.Button} onClick={moveToOrders}>
            주문 내역
          </div>
          <div className={styles.Button} onClick={toastPreparing}>
            프로필 수정
          </div>
          <div className={styles.Button} onClick={signOut}>
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
