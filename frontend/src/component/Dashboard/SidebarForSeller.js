import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const SidebarForSeller = ({id}) => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      
      
      <Link className="linkHover" to={`/seller/products/${id}`}>
        <p>
          <PostAddIcon />
          My Products
        </p>
      </Link>
      <Link className="linkHover" to="/seller/newProduct">
        <p>
          <AddIcon /> Create Product
        </p>
      </Link>
    </div>
  );
};

export default SidebarForSeller;