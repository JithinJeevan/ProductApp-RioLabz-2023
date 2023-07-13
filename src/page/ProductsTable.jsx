/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/dataReducer";
import { useProduct } from "../hook/useProduct";
import ReactPaginate from 'react-paginate';
import ProductInfo from "../components/ProductInfo";
import Spinner from 'react-bootstrap/Spinner';

function ProductsTable(props) {
  

  const {productData,handlePageClick,pageCount,setItemsPerPage,
    currentItems,itemsPerPage,setSearchKeyWord,searchKeyWord,
    handleSearch,categoryData,categoryName,setCategoryName,
    getProductsByCategory,getProductInfo,modalShow, setModalShow,
    productDetais,setProductDetails,isLoading,error} = useProduct();

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">Product App</Navbar.Brand>
         
        </Container>
      </Navbar>
     {isLoading? <div className="mt-5"><Spinner animation="border"  className="m-auto mt-5" /></div>:
      <div>
<Container className="mt-3">
  <Row className="col-lg-12 d-flex flex-row  justify-content-around ">
    <Col className="col-lg-2">
    <Form.Select aria-label="Default select example" onChange={(e)=>{setItemsPerPage(e.target.value)}} value={itemsPerPage}>
      <option>Items Per Page</option>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={15}>15</option>
    </Form.Select>
    </Col>
    <Col className="col-lg-4">
    <Form.Control type="text" placeholder="Search" onChange={(e)=>{setSearchKeyWord(e.target.value)
    
      handleSearch(e.target.value)
    }} value={searchKeyWord}/>
    </Col>
    <Col className="col-lg-4">
    <Form.Select aria-label="Default select example" onChange={(e)=>{setCategoryName(e.target.value)
    if(e.target.value!==""){
      getProductsByCategory(e.target.value)
    }
    }} value={categoryName}>
      <option disables default>Filter</option>
      <option value={"all"}>All</option>
      {categoryData?.map((data)=>(<option value={data} id={data}>{data}</option>))}
    </Form.Select></Col>
  </Row>
</Container>
      <Container className="mt-3  ">
      <Row className="col-lg-12 d-flex justify-content-start   ">

        {currentItems?.map((data)=><>
          <Col className="col-lg-4" key={data.id}>
        <Card style={{ height: '26rem',width: '18rem' }} className="mt-2 me-5 ">
          
      <Card.Img variant="top" src={data.image} style={{ maxHeight: '8rem',maxWidth:'15rem',margin:'auto' }}/>
      
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text className="fs-2">
        ${data.price}
        </Card.Text>
        <Button variant="primary" onClick={()=>{getProductInfo(data.id)
        setModalShow(true)}}>More Info</Button>
      </Card.Body>
    </Card>
        </Col>
        </>)}
        
      </Row>

     
      
    </Container>
    
    <Container className=" d-flex justify-content-end">
    <Row style={{marginTop:"20px"}}>
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        breakClassName={'page-item '}
        breakLinkClassName={'page-link'}
 containerClassName={'pagination'}
 pageClassName={'page-item'}
 pageLinkClassName={'page-link'}
 previousClassName={'page-item'}
 previousLinkClassName={'page-link'}
 nextClassName={'page-item'}
 nextLinkClassName={'page-link'}
 activeClassName={'active'}
 
      />
    </Row>
    </Container>
    </div>}
    <ProductInfo show={modalShow} onHide={()=>{{setModalShow(false)}
    setProductDetails({})}}
    productDetais={productDetais}setProductDetails={setProductDetails}/> 
    </div>
  );
}

export default ProductsTable;
