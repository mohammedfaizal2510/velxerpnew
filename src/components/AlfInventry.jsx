import React from 'react'
import AlfNavbar from './AlfNavbar'
import './AlfInventry.css'
import { Button } from 'react-bootstrap'

const AlfInventry = () => {
  return (
    <>
      <AlfNavbar/>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 text-center'>
            <h3>Available Inventry</h3>
          </div>

          <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
            <div className='inventry-catrd text-center'>
              <img src='https://res.cloudinary.com/dzysiltcv/image/upload/v1728896383/Velx-logo_targ2r.png' alt='Loading...'/>
              <h3>Cement</h3>
              <h3>Available Quantity</h3>
              <Button className='mt-3'>Order</Button>
            </div>
          </div>

          <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
            <div className='inventry-catrd text-center'>
              <img src='https://res.cloudinary.com/dzysiltcv/image/upload/v1728896383/Velx-logo_targ2r.png' alt='Loading...'/>
              <h3>Cement</h3>
              <h3>Available Quantity</h3>
              <Button className='mt-3'>Order</Button>
            </div>
          </div>

          <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
            <div className='inventry-catrd text-center'>
              <img src='https://res.cloudinary.com/dzysiltcv/image/upload/v1728896383/Velx-logo_targ2r.png' alt='Loading...'/>
              <h3>Cement</h3>
              <h3>Available Quantity</h3>
              <Button className='mt-3'>Order</Button>
            </div>
          </div>

          <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
            <div className='inventry-catrd text-center'>
              <img src='https://res.cloudinary.com/dzysiltcv/image/upload/v1728896383/Velx-logo_targ2r.png' alt='Loading...'/>
              <h3>Cement</h3>
              <h3>Available Quantity</h3>
              <Button className='mt-3'>Order</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AlfInventry
