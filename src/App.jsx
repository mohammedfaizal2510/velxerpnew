
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import LogIn from './components/LogIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AlfProjects from './components/AlfProjects';
import AlfInventry from './components/AlfInventry';
import AlfAttendance from './components/AlfAttendance';
import AlfEmployeesList from './components/AlfEmployeesList';
import AlfInbox from './components/AlfInbox';
import PinInventry from './components/PinInventry';
import PinMaterialReques from './components/PinMaterialReques';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/log-in' element={<LogIn/>}/>
        {/* <Route path='/projects' element={<AlfProjects/>}/> */}
        {/* <Route path='/inventry' element={<AlfInventry/>}/> */}
        <Route path='/projects'>
          <Route path='dashboard' element={<AlfProjects/>}></Route>
          {/* <Route path='dashboard/try' element={<TryForInside/>}></Route> */}
          <Route path='dashboard/attendance' element={<AlfAttendance/>}></Route>
          <Route path='dashboard/resuestMaterial' element={<PinMaterialReques/>}></Route>
          <Route path='dashboard/inventry' element={<PinInventry/>}></Route>
          <Route path='inventry' element={<AlfInventry/>}></Route>
          {/* <Route path='attendance' element={<AlfAttendance/>}></Route> */}
          <Route path='Employees' element={<AlfEmployeesList/>}></Route>
          <Route path='inbox' element={<AlfInbox/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
   

     
  )
}

export default App
// {/* <Route path='attendan' element={<Summa/>}></Route> */}
//  {/* <NavBar/>
      
//        <LogIn/>*/}
//        {/* <LandingPage/>  */}