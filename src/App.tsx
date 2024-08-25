import NavbarLayout from '@src/components/layout/NavbarLayout/NavbarLayout';
import PwaModal from '@src/components/PwaModal/PwaModal';
import Home from '@src/pages/Home/Home';
import List from '@src/pages/List/List';
import Menu from '@src/pages/Menu/Menu';
import Pay from '@src/pages/Pay/Pay';
import Success from '@src/pages/Pay/Success/Success';
import Orders from '@src/pages/Profile/Orders/Orders';
import Profile from '@src/pages/Profile/Profile';
import Shop from '@src/pages/Shop/Shop';
import SignIn from '@src/pages/SignIn/SignIn';
import SignUp from '@src/pages/SignUp/SignUp';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from './App.module.css';
function App() {
  const [deferredPrompt, setDeferredPrompt] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<any>(null);
  const [isInstallPromptVisible, setInstallPromptVisible] = useState(false);

  const isDeviceIOS =
    /iPad|iPhone|iPod/.test(window.navigator.userAgent) &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !(window as any).MSStream &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !(window.navigator as any).standalone;

  useEffect(() => {
    if (isDeviceIOS && sessionStorage.getItem('ios-pwa-later') !== 'true') {
      setInstallPromptVisible(true);
    }
  }, []);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeInstallPrompt = (e: any) => {
      // 브라우저가 자동으로 설치 프롬프트를 표시하지 않도록 방지합니다.
      e.preventDefault();
      // 설치 프롬프트 이벤트를 상태에 저장합니다.
      setDeferredPrompt(e);
      // 설치 버튼을 보이도록 상태를 업데이트합니다.
      setInstallPromptVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('사용자가 PWA 설치를 수락했습니다.');
      } else {
        console.log('사용자가 PWA 설치를 거절했습니다.');
      }

      // 모달을 닫습니다.
      setDeferredPrompt(null);
      setInstallPromptVisible(false);
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Mobile}>
        <Routes>
          <Route path="/" element={<NavbarLayout />}>
            <Route
              path="/"
              element={<div className={styles.NotFound}>404 Not Found</div>}
            />
            <Route path="home" element={<Home />} />
            <Route path="list" element={<List />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/shop/:shopId" element={<Shop />} />
          <Route path="/menu/:menuId" element={<Menu />} />
          <Route path="/pay">
            <Route path=":menuId" element={<Pay />} />
            <Route path="success" element={<Success />} />
          </Route>
          <Route path="/profile/orders" element={<Orders />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route
            path="*"
            element={<div className={styles.NotFound}>404 Not Found</div>}
          />
        </Routes>
        {isInstallPromptVisible ? (
          <PwaModal
            isDeviceIOS={isDeviceIOS}
            onOk={handleInstallClick}
            onCancel={() => {
              setDeferredPrompt(null);
              setInstallPromptVisible(false);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
