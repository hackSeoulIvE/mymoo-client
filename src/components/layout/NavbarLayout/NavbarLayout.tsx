import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import styles from './NavbarLayout.module.css';

export default function NavbarLayout() {
  return (
    <div className={styles.Container}>
      <Outlet />
      <div className={styles.NavbarWrapper}>
        <Navbar />
      </div>
    </div>
  );
}
