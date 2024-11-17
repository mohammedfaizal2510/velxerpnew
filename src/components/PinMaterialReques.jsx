import React, { useRef, useState } from 'react'
// import PinNavbar from './PinNavbar'
import { Col, Container, Row, FormControl, Button, ButtonGroup, Modal } from 'react-bootstrap'
import PinSideNav from './PinSideNav'
import PinNavihation from './PinNavihation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const PinMaterialReques = () => {
  const [availableInventry, setAvailableInventry] = useState(
    [
      {inId: 10001, inName: "Cement", inStock:true, inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/cement_pxdann.jpg"},
      {inId: 10002, inName: "M Sand", inStock:false, inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/black_sand_g5tzmg.jpg"},
      {inId: 10003, inName: "P Sand", inStock:true, inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/black_sand_g5tzmg.jpg"},
      {inId: 10004, inName: "River Sand", inStock:true, inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402024/velx/M_Sand_bhyg8o.jpg"},
      {inId: 10005, inName: "Gravel", inStock:true, inImg:""},
      {inId: 10006, inName: "Slurry",inStock:true,  inImg:""},
      {inId: 10007, inName: "Aggregate", inStock:true, inImg:""},
      {inId: 10008, inName: "Brick", inStock:true, inImg:""},
      {inId: 10009, inName: "Block", inStock:true, inImg:""},
      {inId: 10010, inName: "Sheet", inImg:""},
      {inId: 10011, inName: "Steel Bar", inStock:true, inImg:""},
      {inId: 10012, inName: "Wire", inStock:true, inImg:"https://res.cloudinary.com/dzysiltcv/image/upload/v1731402575/velx/wire_rqqddx.jpg"},
    ]
  )

  
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  //modal to add material 
  const materialNameIpRef = useRef();
  const materialImgIpRef = useRef();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const addMaterial = () => {
    const ipMaterialName = materialNameIpRef.current.value.trim();
    const ipMaterialImg = materialImgIpRef.current.value.trim();

    if(ipMaterialName === ""){
      return null;
    }

    const newId = availableInventry.length > 0 ? Math.max(...availableInventry.map(inv => inv.inId)) + 1 : 10001;
    const newInventry = {
      inId : newId,
      inName : ipMaterialName,
      inStock : true,
      inImg : ipMaterialImg 
    };
    setAvailableInventry([...availableInventry, newInventry]);
    console.log(newInventry);
    handleClose();
  }



  return (
    <>
      {/* <PinNavbar/> */}
      <Container fluid>
        <Row>
          <Col xs={1}>
            {/* <PinNavbar /> */}
            <PinSideNav selectedKey = "requestmaterial"/>
          </Col>
          <Col xs={11}>
          <PinNavihation/>
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

              </div>
              <div className="col-12">
                <h1 className='text-center'>Request Materials</h1>
                <hr></hr>
              </div>

              {availableInventry.length === 0 ? (
                <p>No Materials Available</p>
              ) : (
                availableInventry.map((eachInventry) => (
                  <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
                    <div className='inventry-catrd text-center'>
                      <img src={eachInventry.inImg} className='w-75 mt-3 mb-3' style={{borderRadius:"50%"}} alt='Loading...'/>
                      <h3>{eachInventry.inName}</h3> 
                      <Button className='mb-3'>Request</Button>
                    </div>
                  </div>
                ))
              )}

              

              <div className="col-12">
                <h1 className='text-center'>Materials In Site</h1>
                <hr></hr>
              </div>
            </div>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Create Material</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label>Material Name</label>
              <input ref={materialNameIpRef} type='text' placeholder='Material Name' className='w-100 mb-4'/>

              <label>Material Image Link</label>
              <input ref={materialImgIpRef} type='text' placeholder='Material Image Link' className='w-100 mb-4'/>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="primary" onClick={addMaterial}>Save</Button>
            </Modal.Footer>
          </Modal>


          <Modal>
            <Modal.Header>
              <Modal.Title>Raise Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
            </Modal.Body>
              
          </Modal>
          </Col>
        </Row>
      </Container>
      
    </>
  ) 
}

export default PinMaterialReques
