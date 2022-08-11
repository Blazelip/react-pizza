import React from 'react';
import _ from 'lodash';  

import styles from './Search.module.scss'

import SearchIcon from '../../assets/img/search-icon.svg';
import CloseIcon from '../../assets/img/close-cross.svg';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');

  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    _.debounce((str) => {
      dispatch(setSearchValue(str));
    }, 200)
    ,[]
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');

    inputRef.current?.focus();
  }

  return (
    <div className={styles.root}>
      <img className={styles.search} src={SearchIcon} alt="Search icon" />
      <input 
        ref={inputRef}
        value={value}
        onChange={onChangeInput} 
        className={styles.input}
        placeholder="Поиск пиццы"
      />
      {
        value && (
          <img onClick={onClickClear} className={styles.closeCross} src={CloseIcon} alt="Close icon" />
        )
      }
    </div>
  )
};

export default Search;