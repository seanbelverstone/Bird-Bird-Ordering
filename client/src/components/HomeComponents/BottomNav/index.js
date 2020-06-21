import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  NavbarToggler
} from 'reactstrap';
import instaLogo from "../../../images/insta-logo.svg";
import fbLogo from "../../../images/facebook.png";
import "./style.css";

const BottomNav = () => {

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div id="navContainer">
      <Navbar fixed="bottom" light expand="md">
      <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink id="home" href="https://www.birdbirdbiscuit.com/birdbirdbiscuit">HOME</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.toasttab.com/bird-bird-biscuit/v3">ONLINE ORDER</NavLink>
            </NavItem>
            <NavItem>
              {/* this will be the live website when done */}
              <NavLink href="#" id="dozens">DOZENS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.birdbirdbiscuit.com/">OUR STORY</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.birdbirdbiscuit.com/menu">MENU</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.birdbirdbiscuit.com/location">LOCATION</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.birdbirdbiscuit.com/parking">PARKING</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.birdbirdbiscuit.com/contact">CONTACT</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.birdbirdbiscuit.com/press">PRESS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.birdbirdbiscuit.com/now-hiring">NOW HIRING</NavLink>
            </NavItem>
          </Nav>


          <a href="http://instagram.com/birdbirdbiscuit" target="_blank" rel="noopener noreferrer">
            <img src={instaLogo} alt="Instagram logo" id="insta" />
          </a>
          <a href="https://www.facebook.com/birdbirdbiscuit" target="_blank" rel="noopener noreferrer">
            <img src={fbLogo} alt="Facebook logo" id="facebook" href="https://www.facebook.com/birdbirdbiscuit"/>
          </a>
          </Collapse>
        </Navbar>
      </div>
  );
}

export default BottomNav;