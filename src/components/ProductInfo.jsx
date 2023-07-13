import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

function ProductInfo({show,onHide,productDetais}) {
   

  return (
    <div>
      <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter" >
          {productDetais.title}
        </Modal.Title>
      </Modal.Header>
      <div className="d-flex justify-content center">
      <Image src={productDetais.image} fluid style={{maxHeight:"10rem",margin:"auto"}} />

      </div>
      <Modal.Body >
      

        <h4 className="text-center"> ${productDetais.price}</h4>
        <p>
        {productDetais.description}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}

export default ProductInfo;
