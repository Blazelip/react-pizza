import React from 'react'
import qs from 'qs';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../redux/store';

import { setFilter, setCurrentPage, setQueryFilters, filterSelector, searchValueSelector } from '../redux/slices/filterSlice'

import Sorting from "../components/Sorting";
import Categories from "../components/Categories";
import PizzaItem from "../components/PizzaItem";
import Placeholder from "../components/PlaceHolder";
import Pagination from '../components/Pagination';

import { sortTypes } from '../components/Sorting';
import { fetchPizzas, pizzaSelector } from '../redux/slices/pizzaSlice';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);

  const filterId = useSelector(filterSelector);
  const sortProp = useSelector((state: RootState) => state.filter.sort);
  const sort = useSelector((state: RootState) => state.filter.sort.value);
  const order = useSelector((state: RootState) => state.filter.order);
  const currentPage = useSelector((state: RootState) => state.filter.currentPage);
  const { items, status } = useSelector(pizzaSelector); 
  const searchValue = useSelector(searchValueSelector);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setFilter(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort,
        filterId,
        currentPage,
        order: order ? 'asc' : 'desc',
      })
      
      navigate(`?${queryString}`); 
    }
    isMounted.current = true;
  }, [filterId, sort, currentPage, order]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      
      const sort = sortTypes.find((item: any) => item.value = params.sort)
      const order = params.order === 'desc' ? false : true;
      dispatch(setQueryFilters({
        ...params,
        order,
        sort,
      }))
    }
  }, []);

  const getPizzas = async () => {
    const filterQuery = filterId > 0 ? `category=${filterId}` : '';
    const searchQuery = searchValue ? `&search=${searchValue}` : '';
    const orderQuery = order ? 'asc' : 'desc';
    dispatch(
      fetchPizzas({
      filterQuery,
      searchQuery,
      orderQuery,
      sort,
      currentPage: String(currentPage),
    }));

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
  }, []);

  const filteredPizzas = items.map((pizza: any) => <PizzaItem key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(6)].map((_, index) => <Placeholder key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={filterId} onClickCategory={onChangeCategory} />
        <Sorting value={sortProp}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          status === 'error' ? <div className="content__error-info">
            <h2>Произошла ошибка</h2>
            <p>
              Не удалось получить пиццы.<br />
              Попробуйте снова позднее.
            </p>
          </div> : ''
        }
        {status === 'loading'
          ? skeletons
          : filteredPizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  )
}

export default Home;