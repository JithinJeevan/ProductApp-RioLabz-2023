import React, { useEffect } from 'react';
import axios from 'axios';
// import { setData } from './reducers/dataReducer';


const BASE_URL = 'https://fakestoreapi.com'; 

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchProductsData = () => {
  return api.get('/products');
};

export const fetchProductsCategory = () => {
  return api.get('/products/categories');
};


export const fetchProductsByEachCategory = (category) => {
  return api.get(`/products/category/${category}`);
};

export const fetchProductsInfo = async(id) => {
  try{
    const result= await api.get(`/products/${id}`).then((res)=>{
      console.log("res",res.data);
      return res.data
    });
    return result
  }
  catch(err){
return {}
  }
  
};
  
 

  