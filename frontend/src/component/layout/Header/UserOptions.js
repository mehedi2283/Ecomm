import React, { Fragment, useState } from "react";
import "./Header.css";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Backdrop from '@mui/material/Backdrop';
import Profile from "../../../images/Profile.png"
import {  useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltIcon></ListAltIcon> , name: "Orders", func: orders },
    { icon: <PersonIcon></PersonIcon> , name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "#9900FF" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon  style={{ color: "red" }} />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon/>,
      name: "Dashboard",
      func: dashboard,
    },{
      icon: <SupportAgentIcon/>,
      name: "Support",
      func: support,
    });
  }
  if (user.role === "seller") {
    options.unshift({
      icon: <DashboardIcon/>,
      name: "Dashboard",
      func: sellerDashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function support() {
    navigate("/admin/support");
  }
  function sellerDashboard() {
    navigate(`/seller/products/${user._id}`);
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11"}}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : Profile}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;