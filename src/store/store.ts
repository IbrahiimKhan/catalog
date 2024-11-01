import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import apiSlice from './services/apiSlice';
import locationReducer from './services/locationSlice';
import cartReducer from './services/cartSlice';
import cachedProductsReducer from './services/cachedProductsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedCachedProductsReducer = persistReducer(persistConfig, cachedProductsReducer);

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        location: locationReducer,
        cart: persistedCartReducer,
        cachedProducts:persistedCachedProductsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;
