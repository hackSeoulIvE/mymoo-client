import { useLocation, useNavigate } from 'react-router-dom';

import homeIcon from './assets/home.svg';
import listOffIcon from './assets/list-off.svg';
import listOnIcon from './assets/list-on.svg';
import profileOffIcon from './assets/profile-off.svg';
import profileOnIcon from './assets/profile-on.svg';
import styles from './Navbar.module.css';
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isListOn = location.pathname === '/list';
  const isProfileOn = location.pathname === '/profile';
  const isHomeOn = location.pathname === '/home';
  const handleListClick = () => {
    navigate('/list');
  };
  const handleProfileClick = () => {
    navigate('/profile');
  };
  const handleHomeClick = () => {
    navigate('/home');
  };
  return (
    <div className={styles.Container}>
      <button className={styles.SearchButton} onClick={handleHomeClick}>
        <img src={homeIcon} />
      </button>
      <div className={styles.Tabs}>
        <button
          className={styles.Tab}
          onClick={handleListClick}
          style={{
            scale: isHomeOn ? 1.1 : 1,
          }}
        >
          <img src={isListOn ? listOnIcon : listOffIcon} />
        </button>
        <button
          className={styles.Tab}
          onClick={handleProfileClick}
          style={{
            scale: isHomeOn ? 1.1 : 1,
          }}
        >
          <img src={isProfileOn ? profileOnIcon : profileOffIcon} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
