import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";


const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  position: relative;
  z-index: 100;
  background: white;
`;

const Logo = styled.img`
  width: 129px;
`;

const NavLinks = styled.ul`
  display: none;
  gap: 20px;

  @media (min-width: 640px) {
    display: flex;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #374151;
  font-weight: 500;
  text-decoration: none;

  hr {
    width: 50%;
    height: 1.5px;
    background-color: #374151;
    border: none;
    display: none;
  }

  &.active hr {
    display: block;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Icon = styled.img`
  width: 20px;
  cursor: pointer;
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ef4444;
  color: white;
  border-radius: 9999px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const ProfileDropdown = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  padding-top: 16px;
  display: none;
  z-index: 1000;

  .group:hover & {
    display: block;
  }
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 144px;
  padding: 12px 20px;
  background: #f8f9fa;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const MenuItem = styled.p`
  cursor: pointer;
  color: #6c757d;

  &:hover {
    color: black;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background: white;
  overflow: hidden;
  transition: all 0.3s ease;
  width: ${(props) => (props.$visible ? "100%" : "0")};
  z-index: 1000;

  @media (min-width: 640px) {
    display: none;
  }
`;

const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  color: #6c757d;
  width: 100%;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  cursor: pointer;

  img {
    height: 16px;
    transform: rotate(180deg);
  }
`;

const MobileNavLink = styled(NavLink)`
  padding: 16px 24px;
  border-bottom: 1px solid #dee2e6;
  color: inherit;
  text-decoration: none;
  width: 100%;

  &.active {
    background: #f8f9fa;
    color: #000;
  }

  &:hover {
    background: #f8f9fa;
  }
`;

const MenuIcon = styled(Icon)`
  @media (min-width: 640px) {
    display: none;
  }
`;

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { getCartCount, user, logout } = useContext(ShopContext);
  const navigate = useNavigate();

  const closeMobileMenu = () => {
    setVisible(false);
  };

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleOrdersClick = () => {
    if (user) {
      navigate("/orders");
    } else {
      navigate("/login");
    }
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <NavContainer>
      <Link to="/">
        <Logo src={assets.logo} alt="Logo" />
      </Link>

      <NavLinks>
        <StyledNavLink to="/">
          <p>HOME</p>
          <hr />
        </StyledNavLink>
        <StyledNavLink to="/collection">
          <p>COLLECTION</p>
          <hr />
        </StyledNavLink>
        <StyledNavLink to="/about">
          <p>ABOUT</p>
          <hr />
        </StyledNavLink>
        <StyledNavLink to="/contact">
          <p>CONTACT</p>
          <hr />
        </StyledNavLink>
      </NavLinks>

      <IconsContainer>
        

        <div className="group relative">
          <Icon src={assets.profile_icon} alt="Profile" />
          <ProfileDropdown>
            <DropdownMenu>
              {user ? (
                <>
                  <MenuItem className="font-medium text-black">
                    Hi, {user.name}
                  </MenuItem>
                  <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
                  <MenuItem onClick={handleOrdersClick}>Orders</MenuItem>
                  <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
                  <MenuItem onClick={() => navigate("/login")}>
                    Register
                  </MenuItem>
                </>
              )}
            </DropdownMenu>
          </ProfileDropdown>
        </div>

        <div className="relative">
          <Link to="/cart">
            <img src={assets.cart_icon} alt="Cart" />
            {getCartCount() > 0 && (
              <CartBadge>
                {getCartCount()}
              </CartBadge>
            )}
          </Link>
        </div>

        <MenuIcon
          src={assets.menu_icon}
          onClick={() => setVisible(true)}
          alt="Menu"
        />
      </IconsContainer>

      <MobileMenu $visible={visible}>
        <MobileMenuContent>
          <BackButton onClick={closeMobileMenu}>
            <img src={assets.dropdown_icon} alt="Back" />
            <p>Back</p>
          </BackButton>

          <MobileNavLink
            to="/"
            onClick={closeMobileMenu}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            HOME
          </MobileNavLink>
          <MobileNavLink
            to="/collection"
            onClick={closeMobileMenu}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            COLLECTION
          </MobileNavLink>
          <MobileNavLink
            to="/about"
            onClick={closeMobileMenu}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            ABOUT
          </MobileNavLink>
          <MobileNavLink
            to="/contact"
            onClick={closeMobileMenu}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            CONTACT
          </MobileNavLink>
        </MobileMenuContent>
      </MobileMenu>
    </NavContainer>
  );
};

export default Navbar;
