// //==================5) pop up text
import React, { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faListCheck, faScrewdriverWrench, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../css/TrySideNav.css'; // Ensure this file is correctly linked

const TrySideNav = ({ selectedKey }) => {
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
    projects: "projects",
    employees: "Employees",
    inventory: "Inventory",
    inbox: "Inbox",
    logout: "Logout",
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 1000 }}>
      <SideNav expanded={isVisible} style={{ height: '100%' }}>
        <SideNav.Toggle onClick={() => setIsVisible(!isVisible)} />
        <SideNav.Nav defaultSelected={selectedKey}>
          <NavItem
            eventKey="projects"
            onClick={() => handleNavigate('/projects/dashboard')}
            onMouseEnter={() => setHoveredItem("projects")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <NavIcon>
              <FontAwesomeIcon icon={faListCheck} style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Projects</NavText>
            {hoveredItem === "projects" && <span className="tooltip">{tooltipText.projects}</span>}
          </NavItem>

          <NavItem
            eventKey="employees"
            onClick={() => handleNavigate('/projects/Employees')}
            onMouseEnter={() => setHoveredItem("employees")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <NavIcon>
              <FontAwesomeIcon icon={faUsers} style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Employees</NavText>
            {hoveredItem === "employees" && <span className="tooltip">{tooltipText.employees}</span>}
          </NavItem>

          <NavItem
            eventKey="inventory"
            onClick={() => handleNavigate('/projects/inventry')}
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
            eventKey="inbox"
            onClick={() => handleNavigate('/projects/inbox')}
            onMouseEnter={() => setHoveredItem("inbox")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <NavIcon>
              <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Inbox</NavText>
            {hoveredItem === "inbox" && <span className="tooltip">{tooltipText.inbox}</span>}
          </NavItem>

          <NavItem
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
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
  );
};

export default TrySideNav;



// //==================5) default nav will be closed
// import React, { useState } from "react";
// import "@trendmicro/react-sidenav/dist/react-sidenav.css";
// import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faListCheck, faScrewdriverWrench, faUsers, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// // import './AlfProjects.css';

// const TrySideNav = ({ selectedKey }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const navigate = useNavigate();

//   const handleNavigate = (path) => {
//     navigate(path);
//     // setIsVisible(false);
//   };

//   const handleLogout = () => {
//     console.log("Logging out...");
//     navigate('/log-in');
//   };

//   return (
//     <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 1000 }}>
//       <SideNav expanded={isVisible} style={{ height: '100%' }}>
//         <SideNav.Toggle onClick={() => setIsVisible(!isVisible)} />
//         <SideNav.Nav defaultSelected={ selectedKey }>
//           <NavItem eventKey="projects" onClick={() => handleNavigate('/projects/dashboard')}>
//             <NavIcon>
//               <FontAwesomeIcon icon={faListCheck} style={{ fontSize: "1.75em" }} />
//             </NavIcon>
//             <NavText>Projects</NavText>
//           </NavItem>
//           <NavItem eventKey="employees" onClick={() => handleNavigate('/projects/Employees')}>
//             <NavIcon>
//               <FontAwesomeIcon icon={faUsers} style={{ fontSize: "1.75em" }} />
//             </NavIcon>
//             <NavText>Employees</NavText>
//           </NavItem>
//           <NavItem eventKey="inventory" onClick={() => handleNavigate('/projects/inventry')}>
//             <NavIcon>
//               <FontAwesomeIcon icon={faScrewdriverWrench} style={{ fontSize: "1.75em" }} />
//             </NavIcon>
//             <NavText>Inventory</NavText>
//           </NavItem>
//           <NavItem eventKey="inbox" onClick={() => handleNavigate('/projects/inbox')}>
//             <NavIcon>
//               <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: "1.75em" }} />
//             </NavIcon>
//             <NavText>Inbox</NavText>
//           </NavItem>
//           <NavItem eventKey="logout" onClick={handleLogout}>
//             <NavIcon>
//               <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: "1.75em" }} />
//             </NavIcon>
//             <NavText>Logout</NavText>
//           </NavItem>
//         </SideNav.Nav>
//       </SideNav>
//     </div>
//   );
// };

// export default TrySideNav;

