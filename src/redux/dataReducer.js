import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit';
import { fetchProductsData } from '../services/Api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetchProductsData();
  // const list = await response.json();
  return response.data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers:{
    [fetchProducts.pending]:(state,action)=>{
      state.isLoading = true;
    },
    [fetchProducts.fulfilled]:(state,action)=>{
      state.isLoading = false;
        state.data = action.payload;
  console.log("response",action.payload);

    }
    ,
    [fetchProducts.rejected]:(state,action)=>{
      state.isLoading = false;
      console.log("jjjj",action);

        state.error = "Internal Server Error";
    }
  }
});

// export const { setData } = dataSlice.actions;
export default dataSlice.reducer;