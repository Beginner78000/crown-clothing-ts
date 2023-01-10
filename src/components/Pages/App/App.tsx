import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

import Spinner from '../../Spinner';

import { checkUserSession } from '../../../actions/user.action';

import { GlobalStyle } from '../../../global.styles';

// Code splitting allow to render the page only when it's called
const Home = lazy(() => import('../Home'));
const Authentication = lazy(() => import('../Authentication'));
const Navigation = lazy(() => import('../Navigation'));
const Shop = lazy(() => import('../Shop'));
const Checkout = lazy(() => import('../Checkout'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle/>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;