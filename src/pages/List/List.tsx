import { useGeoLocation } from '@src/hooks/useGeolocation';
import SearchBar from '@src/pages/List/components/SearchBar/SearchBar';
import ShopCard from '@src/pages/List/components/ShopCard/ShopCard';
import { usePostStoreSearch } from '@src/services/store/postStoreSearch';
import { useEffect, useRef, useState } from 'react';

import styles from './List.module.css';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const List = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { location, error } = useGeoLocation(geolocationOptions);
  const { data } = usePostStoreSearch({
    name: debouncedSearch,
    longitude: location?.longitude,
    latitude: location?.latitude,
  });

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // Adjust the delay as needed

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [search]);

  return (
    <div className={styles.Container}>
      <div className={styles.TopBar}>
        <p className={styles.Title}>주변 가게</p>
      </div>
      <div className={styles.Contents}>
        <SearchBar search={search} onChangeSearch={setSearch} />
        <div className={styles.Shops}>
          <div className={styles.ShopScroll}>
            {data?.map((shop) => (
              <ShopCard
                key={shop.id}
                name={shop.name}
                available={shop.is_open}
                tag={shop.store_type}
                id={shop.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
