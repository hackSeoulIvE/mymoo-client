import logo from '@src/assets/logo.png';
import { useGeoLocation } from '@src/hooks/useGeolocation';
import ModalSheetContent from '@src/pages/Home/components/ModalSheetContent/ModalSheetContent';
import { usePostStoreSearch } from '@src/services/store/postStoreSearch';
import { useEffect, useState } from 'react';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { Sheet } from 'react-modal-sheet';

import currentPosIcon from './assets/current-pos.svg';
import markerOffIcon from './assets/marker-off.svg';
import markerOnIcon from './assets/marker-on.svg';
import styles from './Home.module.css';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const Home = () => {
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [center, setCenter] = useState({ lat: 37.5226368, lng: 127.0939648 });
  const { location, error } = useGeoLocation(geolocationOptions);
  const { data, isPending, isSuccess } = usePostStoreSearch({
    longitude: center.lng,
    latitude: center.lat,
  });
  useEffect(() => {
    if (location) {
      setCenter({
        lat: location.latitude,
        lng: location.longitude,
      });
    }
  }, [location]);
  const handleMarkerClick = (shopId: number) => {
    setSelectedShopId(shopId);
  };
  return (
    <div className={styles.Container} id="sheet-container">
      <div className={styles.TopBar}>
        <img className={styles.Logo} src={logo} />
      </div>
      <Map
        isPanto
        center={{
          lat: center.lat,
          lng: center.lng,
        }}
        style={{ width: '100%', height: 'calc(100% - 80px)' }}
        level={4}
      >
        <MarkerClusterer averageCenter={true} minLevel={3}>
          {isSuccess
            ? data.map((pos) => (
                <MapMarker
                  key={pos.id}
                  position={{
                    lat: pos.latitude,
                    lng: pos.longitude,
                  }}
                  onClick={() => handleMarkerClick(pos.id)}
                  image={{
                    src: pos.is_open ? markerOnIcon : markerOffIcon,
                    size: { width: 43, height: 55 },
                  }}
                />
              ))
            : null}
        </MarkerClusterer>{' '}
        <MapMarker
          position={{
            lat: location?.latitude ?? -1,
            lng: location?.longitude ?? -1,
          }}
          image={{
            src: currentPosIcon,
            size: { width: 42, height: 42 },
          }}
        />
      </Map>
      <Sheet
        isOpen={selectedShopId !== null}
        onClose={() => setSelectedShopId(null)}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          overflow: 'visible',
        }}
        mountPoint={document.getElementById('sheet-container') as Element}
        snapPoints={[500, 0]}
      >
        <Sheet.Container
          style={{
            borderRadius: '16px 16px 0 0',
          }}
        >
          <Sheet.Header />
          <Sheet.Content>
            <ModalSheetContent shopId={selectedShopId} />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
};

export default Home;
