import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const PinNavihation = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="continer-fluid">
        <div className="row text-center mt-5">
            <div className="col-6">
                <Button className='w-75' onClick={() => navigate('/projects/dashboard/attendance')}>Attendance</Button>
            </div>

            <div className="col-6">
                <Button className='w-75' onClick={() => navigate('/projects/dashboard/resuestMaterial')}>Materials</Button>
            </div>
        </div>
      </div>
    </>
  )
}

export default PinNavihation
