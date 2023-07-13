import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit';
import { fetchProductsByEachCategory } from '../services/Api';

export const fetchEachCategoryProducts = createAsyncThunk('categoryProduct/fetchCategoryProducts', async (category) => {
  const response = await fetchProductsByEachCategory(category);
  return response.data;
});

const productByCategorySlice = createSlice({
  name: 'categories',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers:{
    [fetchEachCategoryProducts.pending]:(state,action)=>{
      state.isLoading = true;
    },
    [fetchEachCategoryProducts.fulfilled]:(state,action)=>{
      state.isLoading = false;
        state.data = action.payload;

    }
    ,
    [fetchEachCategoryProducts.rejected]:(state,action)=>{
      state.isLoading = false;

        state.error = "Internal Server Error";
    }
  }
});

export default productByCategorySlice.reducer;