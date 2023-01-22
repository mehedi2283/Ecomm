import React from "react";
import logo from "../../../images/logo.png";
import { ReactNavbar } from "overlay-navbar";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";

const Header = () => {
    

    return (
        
            <ReactNavbar
                burgerColorHover="#9900FF"
                logo={logo}
                logoWidth="20vmax"
                navColor1="#fff5f5"
                logoHoverSize="10px"
                logoHoverColor="#9900FF"
                link1Text="Home"
                link2Text="Products"
                link3Text="Contact"
                link4Text="About"
                link1Url="/"
                link2Url="/products"
                link3Url="/contact"
                link4Url="/about"
                link1Size="1.3vmax"
                link1Color="rgba(35, 35, 35,0.8)"
                nav1justifyContent="flex-end"
                nav2justifyContent="flex-end"
                nav3justifyContent="flex-start"
                nav4justifyContent="flex-start"
                link1ColorHover="#9900FF"
                link1Margin="1vmax"
                profileIconUrl="/login"
                cartIconUrl="/cart"
                searchIconUrl="/search"
                profileIconColor="rgba(35, 35, 35,0.8)"
                searchIconColor="rgba(35, 35, 35,0.8)"
                cartIconColor="rgba(35, 35, 35,0.8)"
                profileIconColorHover="#9900FF"
                searchIconColorHover="#9900FF"
                cartIconColorHover="#9900FF"
                cartIconMargin="1vmax"
                profileIcon={true}
                cartIcon={true}
                searchIcon={true}
                ProfileIconElement={HiUserCircle}
                CartIconElement={FaShoppingCart}
                SearchIconElement={FaSearch}
            ></ReactNavbar>
        
    );
};

export default Header;
