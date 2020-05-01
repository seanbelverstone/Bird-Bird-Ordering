import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import "./css/bottomNav.css";

const BottomNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="https://www.birdbirdbiscuit.com/birdbirdbiscuit">HOME</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.toasttab.com/bird-bird-biscuit/v3">ONLINE ORDER</NavLink>
            </NavItem>
            <NavItem>
              {/* this will be the live website when done */}
              <NavLink href="#">DOZENS</NavLink>
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
          <NavbarText>Simple Text</NavbarText>
        </Navbar>
      </div>
  );
}

export default BottomNav;