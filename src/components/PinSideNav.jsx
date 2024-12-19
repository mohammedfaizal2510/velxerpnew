import React, { useState, useEffect } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faListCheck, faScrewdriverWrench, faUsers, faSignOutAlt, faClipboardUser, faHand, faCircleArrowLeft, faCircleLeft, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../css/TrySideNav.css';
import axios from "axios";

const PinSideNav = ({ selectedKey }) => {
    const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null); // Track which item is hovered
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    console.log("Logging out...");
        
    navigate('/log-in');
  };

  const tooltipText = {
    attendance: "attendance",
    requestmaterial: "request material",
    inventory: "Inventory",
    goback: "back to projects",
    salary:"salary",
    // logout: "Logout",
  }; 


  const [sd, setsd] = useState([]);
  const [srd, rsd] = useState([]);
  useEffect(() => {
    const gd = async () => {
      axios
        .get(`${import.meta.env.VITE_SER}siem`, {
          headers: {
            siteid: await sessionStorage.getItem("site"),
          },
        })
        .then((res) => {
          setsd(res.data.emplyee);
          rsd(res.data.stock);
        });
    };
    gd();
  }, []);
  return (
    <>
        <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 1000 }}>
      <SideNav expanded={isVisible} style={{ height: '100%' }}>
        <SideNav.Toggle onClick={() => setIsVisible(!isVisible)} />
        <SideNav.Nav defaultSelected={selectedKey}>
          <NavItem
            eventKey="attendance"
            onClick={() => navigate('/projects/dashboard/attendance',{
              state: { att: sd },
            })}
            onMouseEnter={() => setHoveredItem("attendance")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <NavIcon>
              <FontAwesomeIcon icon={faClipboardUser} style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Attendance</NavText>
            {hoveredItem === "attendance" && <span className="tooltip">{tooltipText.attendance}</span>}
          </NavItem>

          <NavItem
            eventKey="requestmaterial"
            onClick={() => navigate('/projects/dashboard/resuestMaterial', {
              state: { met: srd },
            })}
            onMouseEnter={() => setHoveredItem("requestmaterial")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <NavIcon>
              <FontAwesomeIcon icon={faHand} style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Request Material</NavText>
            {hoveredItem === "requestmaterial" && <span className="tooltip">{tooltipText.requestmaterial}</span>}
          </NavItem>

          <NavItem
            eventKey="salary"
            onClick={() => navigate('/projects/dashboard/salary', )}
            onMouseEnter={() => setHoveredItem("salary")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <NavIcon>
              <FontAwesomeIcon icon={faMoneyBillTransfer} style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>salary</NavText>
            {hoveredItem === "salary" && <span className="tooltip">{tooltipText.salary}</span>}
          </NavItem>

          <NavItem
            eventKey="inventory"
            onClick={() => handleNavigate('/projects/dashboard/inventry')}
            onMouseEnter={() => setHoveredItem("inventory")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <NavIcon>
              <FontAwesomeIcon icon={faScrewdriverWrench} style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Inventory</NavText>
            {hoveredItem === "inventory" && <span className="tooltip">{tooltipText.inventory}</span>}
          </NavItem>

          <NavItem
            eventKey="goback"
            onClick={() => handleNavigate('/projects/dashboard')}
            onMouseEnter={() => setHoveredItem("goback")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <NavIcon>
              <FontAwesomeIcon icon={faCircleArrowLeft} style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>goback</NavText>
            {hoveredItem === "goback" && <span className="tooltip">{tooltipText.goback}</span>}
          </NavItem>

          {/* <NavItem
            eventKey="logout"
            onClick={handleLogout}
            onMouseEnter={() => setHoveredItem("logout")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <NavIcon>
              <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Logout</NavText>
            {hoveredItem === "logout" && <span className="tooltip">{tooltipText.logout}</span>}
          </NavItem> */}
        </SideNav.Nav>
      </SideNav>
    </div>
    </>
  )
}

export default PinSideNav
