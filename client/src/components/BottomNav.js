import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import instaLogo from "../images/insta-logo.svg";
import fbLogo from "../images/facebook.png";
import "./css/bottomNav.css";

const BottomNav = () => {

  return (
    <div>
      <Navbar fixed="bottom" light expand="md">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="https://www.birdbirdbiscuit.com/birdbirdbiscuit">HOME</NavLink>
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
          <img src={instaLogo} alt="Instagram logo" id="insta" href="http://instagram.com/birdbirdbiscuit"/>
          <img src={fbLogo} alt="Facebook logo" id="facebook" href="https://www.facebook.com/birdbirdbiscuit"/>
        </Navbar>
      </div>
  );
}

export default BottomNav;