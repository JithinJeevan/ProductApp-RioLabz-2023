import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';

import ProductsTable from "./page/ProductsTable";


function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="App">
     <Routes>
     <Route element={<ProductsTable/>} path="/" />
     
      </Routes> 
    </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
