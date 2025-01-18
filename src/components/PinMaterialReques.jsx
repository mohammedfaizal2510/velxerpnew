import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Col, Container, Row, FormControl, Button, Modal } from 'react-bootstrap'
import PinSideNav from './PinSideNav'
import PinNavihation from './PinNavihation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faMinus, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
import {useLocation, } from 'react-router-dom'
import axios from 'axios'

const PinMaterialReques = () => {


    const loc = useLocation();
    const [availableInventry, setAvailableInventry] = useState([]);
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SER}stocs`,{headers:{auth:loc.state?.met || sessionStorage.getItem('auth'),edit:sessionStorage.getItem('site')}}).then(t=>{setMaterialInSite(t.data)})
        axios.get(`${import.meta.env.VITE_SER}stoc`,{headers:{auth:sessionStorage.getItem('admin') || sessionStorage.getItem('auth')}}).then(t=>{setAvailableInventry(t.data);return t.data.filter(i=>!i.ship?false:i.ship[sessionStorage.getItem('site')])}).then(m=>m.map(i=>({...i,quant:i.ship[sessionStorage.getItem('site')]}))).then(setMaterialRequest)
    },[])
    //create material
    const materialNameIpRef = useRef();
    const materialImgIpRef = useRef();
    const materialQuantIpRef = useRef();
    const materialUnitIpRef = useRef();

    const [editingMaterial, setEditingMaterial] = useState(null); // to edit
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setEditingMaterial(null); // Reset editing state
    };



    const addMaterial = () => {
        const ipMaterialName = materialNameIpRef.current.value.trim();
        const ipMaterialImg = materialImgIpRef.current.value.trim();
        const ipMaterialQuant = materialQuantIpRef.current.value.trim();
        const ipMaterialUnit = materialUnitIpRef.current.value.trim();

        if(ipMaterialName === ""){
            return null;
        }
        if (editingMaterial) {
            // Edit existing material
            axios.put(`${import.meta.env.VITE_SER}stoc`,{
                name: ipMaterialName,
                quant: ipMaterialQuant,
                unit: ipMaterialUnit,
                inImg: ipMaterialImg,
            },{headers:{edit:editingMaterial._id,auth:sessionStorage.getItem('auth'),admin:sessionStorage.getItem("admin") || sessionStorage.getItem("auth")}}).then(()=>{
                    const updatedInventory = availableInventry.map((item) =>
                        item._id === editingMaterial._id
                            ? {
                                ...item,
                                name: ipMaterialName,
                                quant: ipMaterialQuant,
                                unit: ipMaterialUnit,
                                inImg: ipMaterialImg,
                            }
                            : item
                    );
                    setAvailableInventry(updatedInventory);
                })
        }
        else {
            // Add new material
            const newInventry = {
                name: ipMaterialName,
                quant: ipMaterialQuant,
                unit: ipMaterialUnit,
                inImg: ipMaterialImg,
            };
            axios.post(`${import.meta.env.VITE_SER}stoc`,newInventry,{headers:{admin:sessionStorage.getItem("admin") || sessionStorage.getItem("auth"),edit:sessionStorage.getItem("site"),auth:sessionStorage.getItem('auth')}}).then(t=>{
                setAvailableInventry([...availableInventry, newInventry]);
            })
        }
        handleClose();
    };
    const handleEditClick = (material) => {
        setEditingMaterial(material);
        handleShow();
    };


    //material request
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
        axios.post(`${import.meta.env.VITE_SER}req/mat`,{site:sessionStorage.getItem('site'),stock:selectedMaterial._id,quant:ipReqMaterialQuantity},{headers:{auth:sessionStorage.getItem('auth'),admin:sessionStorage.getItem("admin") || sessionStorage.getItem("auth")}}).then(()=>{
            setMaterialRequest([...materialRequest, newRequest]);
        })

        const newRequest = {
            name: selectedMaterial.name,
            quant: ipReqMaterialQuantity
        };

        reqMaterialQuantityIpRef.current.value = "";
        setRequestModalShow(false);
    };

    const requestModalClose = () => {
        setRequestModalShow(false);
    };

    //material in site
    const [materialInSite, setMaterialInSite] = useState([
    ]);
    const [siteModalShow, setSiteModalShow] = useState(false);
    const materialInSiteModalClose = () => setSiteModalShow(false);
    const materialInSiteModalOpen = () => setSiteModalShow(true); 
    const mNameInSiteRef = useRef();
    const mQuantityInSiteRef = useRef();
    const mUnitInSiteRef = useRef();

    const addMaterialInSite = () => {
        const ipMInSiteName = mNameInSiteRef.current.value.trim();
        const ipMInSiteQuantity = mQuantityInSiteRef.current.value.trim();
        const ipMInSiteUnit = mUnitInSiteRef.current.value.trim();
        if (ipMInSiteName === "") {
            return null;
        }
        const newMaterialInSite = {
            name: ipMInSiteName,
            quantity: ipMInSiteQuantity,
            unitStr: ipMInSiteUnit
        }
        setMaterialInSite([...materialInSite, newMaterialInSite]);
        materialInSiteModalClose()
    }
    // const [selectedMaterialInSite, setSelectedMaterialInSite] = useState(null);

    const handleIncrement = (material) => {
        setMaterialInSite((prevState) =>
            prevState.map((item) =>
                item._id === material._id
                    ? { ...item, quantity: parseInt(item.quantity) + 1 }
                    : item
            )
        );
    };

    const handleDecrement = (material) => {
        setMaterialInSite((prevState) =>
            prevState.map((item) =>
                item._id === material._id && item.quantity > 0
                    ? { ...item, quantity: parseInt(item.quantity) - 1 }
                    : item
            )
        );
    };


    //for search bars
    const [searchQueryInventory, setSearchQueryInventory] = useState('');
    const [searchQuerySite, setSearchQuerySite] = useState('');

    const handleSearchInventory = () => {
        setSearchQueryInventory(searchQueryInventory.toLowerCase());
    };

    const handleSearchSite = () => {
        setSearchQuerySite(searchQuerySite.toLowerCase());
    };
    const filteredInventory = availableInventry.filter(item =>
        item.name.toLowerCase().includes(searchQueryInventory)
    );

    const filteredSiteMaterials = materialInSite.filter(item =>
        item.name.toLowerCase().includes(searchQuerySite)
    );
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

                                <div className="col-12">
                                    <p className='n-text'>Material Management</p>
                                </div>
                                <div className='col-12'>
                                    <p>Subscriber Name / Project Name / Material Management</p>
                                </div>
                                <div className="col-12 mt-4">
                                    <hr style={{borderTop:"1px solid"}}/>
                                </div>

                                <div className="col-md-9 col-10" style={{ display: "flex" }}>
                                    <FormControl type="text"
                                        className='email-input mt-3'
                                        placeholder="Search by Material Name"
                                        onChange={(e) => setSearchQueryInventory(e.target.value)} />
                                </div>

                                <div className='col-md-1 col-2 mt-2'>
                                    <button className='search-button' onClick={handleSearchInventory}>Search</button>
                                </div>

                                <div className="col-md-2 col-12 mt-2">
                                    <button onClick={handleShow} className='search-button'>
                                        <FontAwesomeIcon icon={faPlus} /> Create Material
                                    </button>
                                </div>


                                <div className="col-12">
                                    <h1 className="text-center">Available Inventory</h1>
                                    <hr />
                                </div>
                                {filteredInventory.map((eachInventry) => (
                                    <div key={eachInventry.inId} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                        {/* <div className="inventry-catrd text-center"> */}
                                        <div className='project-card text-center'>
                                            <img
                                                src={eachInventry.inImg}
                                                className="w-75 mt-3 mb-3"
                                                style={{ borderRadius: "50%" }}
                                                alt="Material"
                                            />
                                            <h3>{eachInventry.name}</h3>
                                            {eachInventry.quant === 0 ? (
                                                <>
                                                    <p className='text-danger'>Out Of Stock</p>
                                                    <button className="mb-3 search-button" onClick={() => modalReqMaterialShow(eachInventry)}>Force Request</button>
                                                </>
                                            ) : (
                                                    <>
                                                        <p className='text-success'>{eachInventry.quant} {eachInventry.unit} Available</p>
                                                        <Button className="mb-3 search-button" onClick={() => modalReqMaterialShow(eachInventry)}>Request</Button>
                                                    </>
                                                )}
                                            <button className='mb-4 ml-3 search-button' style={{border:"none"}} onClick={() => handleEditClick(eachInventry)}> 
                                                <FontAwesomeIcon icon={faPenToSquare} className='text-primary' style={{fontSize:"2em"}}/>
                                            </button>
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
                                            <div key={eachRequest._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                                <div className="project-card text-center p-3">
                                                {/* inventry-catrd */}
                                                    <h3>{eachRequest.name}</h3>
                                                    <img
                                                        src={eachRequest.inImg}
                                                        className="w-75 mt-3 mb-3"
                                                        style={{ borderRadius: "50%" }}
                                                        alt="Material"
                                                    />
                                                    <p>Quantity Requested: {eachRequest.quant} {eachRequest.unit}</p>
                                                    <p className='text-success'>Request Sended Successfully</p>

                                                </div>
                                            </div>
                                        ))
                                    )}

                                <div className="col-12">
                                    <hr/>
                                </div>

                                <div className="col-12">
                                    <h1 className='text-center'>Materials in Site</h1>
                                </div>

                                <div className="col-12">
                                    <hr/>
                                </div>

                                <div className="col-9" style={{ display: "flex" }}>
                                {/* search-box */}
                                    <FormControl 
                                        type="text"
                                        className='email-input'
                                        placeholder="Search by Material Name"
                                        onChange={(e) => setSearchQuerySite(e.target.value)} />
                                </div>

                                <div className='col-1'>
                                    <button className='search-button' onClick={handleSearchSite}>Search</button>
                                </div>

                                <div className="col-2">
                                    <button onClick={materialInSiteModalOpen} className='search-button'>
                                        <FontAwesomeIcon icon={faPlus} />   Add Material
                                    </button>
                                </div>

                                {/* materialInSite = {_id: Date.now(), name: "Cement", quantity:10, unitStr: "moota"} */}
                                {filteredSiteMaterials.length === 0 ? (
                                    <p>No Materials Found In the Site</p>
                                ) : (
                                        filteredSiteMaterials.map((eachMaterial) => (
                                            <div key={eachMaterial._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                                <div className="project-card text-center p-3">
                                                {/* inventry-catrd */}
                                                    <h3>{eachMaterial.name}</h3>
                                                    <img
                                                        src={eachMaterial.inImg}
                                                        className="w-75 mt-3 mb-3"
                                                        style={{ borderRadius: "50%" }}
                                                        alt="Material"
                                                    />
                                                    <div className='d-flex flex-rown justify-content-center'>
                                                        <button className='mr-3 p-3 project-button-danger' onClick={() => handleDecrement(eachMaterial)}>
                                                            < FontAwesomeIcon icon={faMinus } />
                                                        </button>
                                                        <h3>{eachMaterial.quant}</h3>
                                                        <button className='ml-3 btn btn-success' onClick={() => handleIncrement(eachMaterial)}>
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </button>
                                                    </div>
                                                    <p className='mt-2'>Unit : {eachMaterial.unit}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3">

                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>{editingMaterial ? 'Edit Material' : 'Create Material'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Material Name</label>
                        <input
                            ref={materialNameIpRef}
                            type="text"
                            placeholder="Material Name"
                            defaultValue={editingMaterial?.name || ''}
                            className="w-100 mb-4"
                        />

                        <label>Image Link</label>
                        <input
                            ref={materialImgIpRef}
                            type="text"
                            placeholder="Image Link"
                            defaultValue={editingMaterial?.inImg || ''}
                            className="w-100 mb-4"
                        />

                        <label>Quantity</label>
                        <div>
                            <input
                                ref={materialQuantIpRef}
                                type="text"
                                placeholder="Number Of Stocks"
                                defaultValue={editingMaterial?.quant || ''}
                                className="w-50 mb-4"
                            />
                            <input
                                ref={materialUnitIpRef}
                                type="text"
                                placeholder="Units"
                                defaultValue={editingMaterial?.unit || ''}
                                className="w-50 mb-4"
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={addMaterial}>
                            {editingMaterial ? 'Update Material' : 'Add Material'}
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* <Modal show={show} onHide={handleClose}>
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
          </Modal> */}


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

                <Modal show={siteModalShow} onHide={materialInSiteModalClose}>
                    <Modal.Header>
                        <Modal.Title>Add Materials in Site</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Enter Material Name</label>
                        <input
                            ref={mNameInSiteRef}
                            type="text"
                            placeholder="Enter Name"
                            className="w-100 mb-4"
                        />
                        <label>Enter Quantity</label>
                        <div>


                            <input
                                ref={mQuantityInSiteRef}
                                type="text"
                                placeholder="Enter Quantity"
                                className="w-50 mb-4"
                            />
                            <input ref={mUnitInSiteRef} type="text" placeholder='Units' className='w-50 mb-4'/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={materialInSiteModalClose}>Cancel</Button>
                        <Button variant="primary" onClick={addMaterialInSite}>Add Material</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};

export default PinMaterialReques;



