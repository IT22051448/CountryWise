import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import countryListReducer from './countryList/countryListSlice';
import { restCountriesApi } from '../api/restCountriesApi';

export default configureStore({
  reducer: {
    auth: authReducer,
    collection: countryListReducer,
    [restCountriesApi.reducerPath]: restCountriesApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(restCountriesApi.middleware),
});
