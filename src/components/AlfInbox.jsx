import React,{useState,useEffect} from 'react'
import AlfNavbar from './AlfNavbar'
import '../css/AlfProjects.css'
import { Button, Col, Container, Row } from "react-bootstrap";
import AlfCardInbox from './AlfCardInbox';
import TrySideNav from './TrySideNav';
import axios from 'axios';
// import HoverButton from './HoverButton';

const AlfInbox = () => {
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SER}req`,{headers:{admin:sessionStorage.getItem('auth')}}).then(t=>{set(t.data)})
    },[])
    
    const [requestDataset, set]=useState([])
    return (
    <>
        {/* <AlfNavbar/> */}
        
        <Container fluid>
            <Row>
                <Col xs={1}>
                    <TrySideNav selectedKey="inbox"/>
                </Col>
                <Col xs={11}>
                
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-12 text-center'>
                                <h1>Inbox</h1>
                            </div>
                            {/* <HoverButton/> */}

                            {requestDataset.length === 0 ? (
                                <h2>No Requests Found</h2>
                            ) : (
                                requestDataset.map((eachRequest, index) => (
                                    <AlfCardInbox
                                        key={index}
                                        id={eachRequest._id}
                                        subject={eachRequest.for}
                                        from={eachRequest.from}
                                        role={eachRequest.role}
                                        site={eachRequest.site}
                                        date={eachRequest.date}
                                        isAccepted={eachRequest.isAccepted}

                                    />

                                ))
                            )}

                            
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default AlfInbox
