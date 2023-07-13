import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/dataReducer';
import { fetchCategory } from '../redux/categoryReducer';
import { fetchEachCategoryProducts } from '../redux/productsByCategoryReducer';
import { fetchProductsInfo } from '../services/Api';


export const useProduct = ()=>{

    const dispatch = useDispatch();
  const products = useSelector((state) => state.productList.data);
  const categories = useSelector((state) => state.category.data);
  const productByCategory = useSelector((state) => state.productsByCategory.data);

  const isLoading = useSelector((state) => state.productList.isLoading);
  const error = useSelector((state) => state.productList.error);

  const [productData,setProductData]=useState([]);
  const [categoryData,setCategoryData]=useState([]);
  const [productDetais,setProductDetails]=useState({});
  const [modalShow, setModalShow] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchKeyWord,setSearchKeyWord]=useState("");
  const [categoryName,setCategoryName]=useState("");

  
  
  // const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const [currentItems,setCurrentItems] = useState();
  const [pageCount,setPageCount] = useState(0);

  

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % productData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${itemsPerPage}`
    );
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const items = productData.slice(itemOffset, endOffset);
    const page = Math.ceil(productData.length / itemsPerPage);
    setPageCount(page)
    setCurrentItems(items)
  }, [itemOffset,itemsPerPage,productData]);

  // useEffect(() => {
  //   const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //   const items = productData.slice(itemOffset, endOffset);
  //   const page = Math.ceil(productData.length / itemsPerPage);
  //   setPageCount(page)
  //   setCurrentItems(items)
  // }, [productData]);

  useEffect(() => {
      dispatch(fetchProducts());
      dispatch(fetchCategory());
      
    }, [dispatch]);

    useEffect(() => {
      if(products.length>0){
       
     setProductData(products)
     
    }
    if(categories.length>0){
      setCategoryData(categories)
    }
    
    }, [products,categories]);

    useEffect(() => {
      if(productByCategory.length>0){
       setProductData(productByCategory)
        
    }
      
    }, [productByCategory]);

  const getProductsByCategory=(category)=>{
    if(category==="all"){
setProductData(products)
    }
    else{
    dispatch(fetchEachCategoryProducts(category));
      
    }

  }  
    
  const getProductInfo =async(id)=>{
    const result = await fetchProductsInfo(id).then((res)=>{
      setProductDetails(res)
      setModalShow(true)
       return res
    })
  }
const handleSearch=(value)=>{
  const endOffset = itemOffset + itemsPerPage;

  if(value!==""){
  const filteredArray = productData?.filter((data)=>{
    const filter1 = data.title?.toLowerCase().indexOf(value.toLowerCase())
    return filter1>-1
  })
  const items = filteredArray?.slice(itemOffset, endOffset)
      const page = Math.ceil(filteredArray?.length / itemsPerPage)
  setCurrentItems(items)
  setPageCount(page)
}
else{
  const items = productData?.slice(itemOffset, endOffset)
      const page = Math.ceil(productData?.length / itemsPerPage)
      setCurrentItems(items);
      setPageCount(page)
}
}

    console.log("hiii",productData);

    return {productData,handlePageClick,pageCount,setItemsPerPage,
     currentItems, itemsPerPage,setSearchKeyWord,searchKeyWord,
      handleSearch,categoryData,categoryName,setCategoryName,
      getProductsByCategory,getProductInfo,modalShow, setModalShow,
      productDetais,setProductDetails,isLoading,error}
}