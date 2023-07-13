import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit';
import { fetchProductsCategory } from '../services/Api';

export const fetchCategory = createAsyncThunk('category/fetchCategories', async () => {
  const response = await fetchProductsCategory();
  return response.data;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers:{
    [fetchCategory.pending]:(state,action)=>{
      state.isLoading = true;
    },
    [fetchCategory.fulfilled]:(state,action)=>{
      state.isLoading = false;
        state.data = action.payload;

    }
    ,
    [fetchCategory.rejected]:(state,action)=>{
      state.isLoading = false;

        state.error = "Internal Server Error";
    }
  }
});

export default categorySlice.reducer;