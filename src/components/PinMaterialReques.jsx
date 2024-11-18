import React, { useReducer, useRef, useState } from 'react'
import { Col, Container, Row, FormControl, Button, Modal } from 'react-bootstrap'
import PinSideNav from './PinSideNav'
import PinNavihation from './PinNavihation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const PinMaterialReques = () => {
  
  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  const [availableInventry, setAvailableInventry] = useState(
    [
      {inId: 10001, inName: "Cement", quant:10, unit: '', inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/cement_pxdann.jpg"},
      {inId: 10002, inName: "M Sand", quant:0, unit: '', inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/black_sand_g5tzmg.jpg"},
      {inId: 10003, inName: "P Sand", quant:0, unit: '', inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/black_sand_g5tzmg.jpg"},
      {inId: 10004, inName: "River Sand", quant:0, unit: '', inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/M_Sand_bhyg8o.jpg"},
      {inId: 10005, inName: "Gravel", quant:0, unit: '', inImg:""},
      {inId: 10006, inName: "Slurry",quant:0, unit: '',  inImg:""},
      {inId: 10007, inName: "Aggregate", quant:0, unit: '', inImg:""},
      {inId: 10008, inName: "Brick", quant:0, unit: '', inImg:""},
      {inId: 10009, inName: "Block", quant:0, unit: '', inImg:""},
      {inId: 10010, inName: "Sheet", quant:0, unit: '', inImg:""},
      {inId: 10011, inName: "Steel Bar", quant:0, unit: '', inImg:""},
      {inId: 10012, inName: "Wire", quant:0, unit: '', inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402575/velx/wire_rqqddx.jpg"},
    ]
  );

  //create material
  const materialNameIpRef = useRef();
  const materialImgIpRef = useRef();
  const materialQuantIpRef = useRef();
  const materialUnitIpRef = useRef();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const addMaterial = () => {
    const ipMaterialName = materialNameIpRef.current.value.trim();
    const ipMaterialImg = materialImgIpRef.current.value.trim();
    const ipMaterialQuant = materialQuantIpRef.current.value.trim();
    const ipMaterialUnit = materialUnitIpRef.current.value.trim();

    if(ipMaterialName === ""){
      return null;
    }

    const newId = availableInventry.length > 0 ? Math.max(...availableInventry.map(inv => inv.inId)) + 1 : 10001;
    const newInventry = {
      inId : newId,
      inName : ipMaterialName,
      quant : ipMaterialQuant,
      unit : ipMaterialUnit,
      inImg : ipMaterialImg 
    };
    setAvailableInventry([...availableInventry, newInventry]);
    console.log(newInventry);
    handleClose();
  }

  const [materialRequest, setMaterialRequest] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [requestModalShow, setRequestModalShow] = useState(false);
  const reqMaterialQuantityIpRef = useRef();

  const modalReqMaterialShow = (material) => {
    setSelectedMaterial(material);
    setRequestModalShow(true);
  };

  const addRequestCard = () => {
    const ipReqMaterialQuantity = reqMaterialQuantityIpRef.current.value.trim();
    if (!ipReqMaterialQuantity || !selectedMaterial) {
      return;
    }

    const newRequest = {
      requestId: Date.now(),
      isApproved: false,
      materilId: selectedMaterial.inId,
      materialName: selectedMaterial.inName,
      quantityToRequest: ipReqMaterialQuantity
    };

    setMaterialRequest([...materialRequest, newRequest]);
    reqMaterialQuantityIpRef.current.value = "";
    setRequestModalShow(false);
  };

  const requestModalClose = () => {
    setRequestModalShow(false);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={1}>
            <PinSideNav selectedKey="requestmaterial" />
          </Col>
          <Col xs={11}>
            <PinNavihation />
            <div className="container-fluid mt-5">
              <div className="row">

              <div className="col-9 search-box" style={{ display: "flex" }}>
                                    <FormControl type="text" placeholder="Search by Material Name" onChange={handleSearch} />
              </div>

              <div className='col-1'>
                                    <Button onClick={handleSearch}>Search</Button>
              </div>

              <div className="col-2">
                <Button onClick={handleShow}>
                  <FontAwesomeIcon icon={faPlus} /> Create Material
                </Button>
              </div>


                <div className="col-12">
                  <h1 className="text-center">Available Inventory</h1>
                  <hr />
                </div>
                {availableInventry.map((eachInventry) => (
                  <div key={eachInventry.inId} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="inventry-catrd text-center">
                      <img
                        src={eachInventry.inImg}
                        className="w-75 mt-3 mb-3"
                        style={{ borderRadius: "50%" }}
                        alt="Material"
                      />
                      <h3>{eachInventry.inName}</h3>
                      {eachInventry.quant === 0 ? (
                        <>
                          <p>Out Of Stock</p>
                          <Button className="mb-3" onClick={() => modalReqMaterialShow(eachInventry)}>Force Request</Button>
                        </>
                      ) : (
                        <>
                          <p>{eachInventry.quant} {eachInventry.unit} Available</p>
                          <Button className="mb-3" onClick={() => modalReqMaterialShow(eachInventry)}>Request</Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                <div className="col-12">
                  <hr />
                </div>
                <div className="col-12">
                  <h1 className="text-center">Material Requests</h1>
                  <hr />
                </div>
                {materialRequest.length === 0 ? (
                  <p>No Requests Found</p>
                ) : (
                  materialRequest.map((eachRequest) => (
                    <div key={eachRequest.requestId} className="col-12 col-sm-6 col-md-4 col-lg-3">
                      <div className="inventry-catrd text-center p-3">
                        <h3>{eachRequest.materialName}</h3>
                        <p>Quantity Requested: {eachRequest.quantityToRequest}</p>
                        {eachRequest.isApproved ? <p>Approved</p> : <p>Not Approved</p>}
                      </div>
                    </div>
                  ))
                )}

                <div className="col-12">
                  <hr/>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Create Material</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label>Material Name</label>
              <input ref={materialNameIpRef} type='text' placeholder='Material Name' className='w-100 mb-4'/>

              <label>Image Link</label>
              <input ref={materialImgIpRef} type='text' placeholder='Image Link' className='w-100 mb-4'/>

              <label>Quantity</label>
              <div>
                <input ref={materialQuantIpRef} type="text" placeholder='Number Of Stocks' className='w-50 mb-4'/>
                <input ref={materialUnitIpRef} type='text' placeholder='Units' className='w-50 mb-4'/>
              </div>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="primary" onClick={addMaterial}>Save</Button>
            </Modal.Footer>
          </Modal>


        <Modal show={requestModalShow} onHide={requestModalClose}>
          <Modal.Header>
            <Modal.Title>Raise Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Enter Quantity</label>
            <input
              ref={reqMaterialQuantityIpRef}
              type="text"
              placeholder="Quantity To Request"
              className="w-100 mb-4"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={requestModalClose}>Cancel Request</Button>
            <Button variant="primary" onClick={addRequestCard}>Send Request</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default PinMaterialReques;