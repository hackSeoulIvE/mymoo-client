import searchIcon from './assets/search.svg';
import styles from './SearchBar.module.css';
type SearchBarProps = {
  search: string;
  onChangeSearch: (value: string) => void;
};
const SearchBar = ({ search, onChangeSearch }: SearchBarProps) => {
  return (
    <div className={styles.Container}>
      <img src={searchIcon} />
      <input
        className={styles.Input}
        type="text"
        placeholder="검색어를 입력해주세요"
        value={search}
        onChange={(e) => onChangeSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
