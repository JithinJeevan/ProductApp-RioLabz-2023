import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataReducer'
import categoryReducer from './categoryReducer'
import productsByCategoryReducer from './productsByCategoryReducer';

const store = configureStore({
  reducer: {
    productList: dataReducer,
    category: categoryReducer,
    productsByCategory:productsByCategoryReducer
  },
});

export default store;