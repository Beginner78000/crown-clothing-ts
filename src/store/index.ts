/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from '../middlewares/logger';
import createSagaMiddleware from 'redux-saga';

// import thunk from 'redux-thunk';
import { rootSaga } from './rootSaga';
import { rootReducer } from '../reducers';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Si on n'est pas en production, et si la fonction existe
// on viendra connecter le redux devtool
// avec la prise en charge des autres enhancers (ex: middleware, fonctions)
const composeEnhancers = (
  process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const sagaMiddleware = createSagaMiddleware();

type ExtendedPersistConfig = PersistConfig<RootState> & {
  // On veut que la whitelist ne contienne qu'un tableau des clés de RootState
  // Ainsi la clé ne ramènera que les valeurs à l'intérieur de RootState
  // Qui sont les valeur que l'on souhaite passer dans persistConfig/whitelist
  whitelist: (keyof RootState)[]
}

// Redux-persist est un outil qui permet de conserver 
// les valeurs de notre reducer dans le local storage
const persistConfig: ExtendedPersistConfig = {
  // Where do it start
  key: 'root',
  // Where do we store 
  storage,
  // Data we don't want to persist in the localStorage
  // User is already persisting with the AuthListener
  // So we want to avoid conflict 
  // blacklist: ['user']
  // Il est aussi possible de dire ce qu'on souhaite
  // qu'il persiste
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger, sagaMiddleware
  // Tout ce qui doit passer par la méthode filter doit être de type middleware
].filter((middleware): middleware is Middleware => Boolean(middleware));


export const store = createStore(
  persistedReducer,
  undefined,
  composeEnhancers(
    applyMiddleware(...middleWares),
  ),
);

sagaMiddleware.run(rootSaga);

// console.log(store);
export const persistor = persistStore(store);
