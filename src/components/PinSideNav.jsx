import React, { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faListCheck, faScrewdriverWrench, faUsers, faSignOutAlt, faClipboardUser, faHand, faCircleArrowLeft, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './TrySideNav.css';

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
    // logout: "Logout",
  }; 
  return (
    <>
        <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 1000 }}>
      <SideNav expanded={isVisible} style={{ height: '100%' }}>
        <SideNav.Toggle onClick={() => setIsVisible(!isVisible)} />
        <SideNav.Nav defaultSelected={selectedKey}>
          <NavItem
            eventKey="attendance"
            onClick={() => handleNavigate('/projects/dashboard/attendance')}
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
            onClick={() => handleNavigate('/projects/dashboard/resuestMaterial')}
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
