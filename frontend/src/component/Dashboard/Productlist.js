import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    getAdminProduct,
    deleteProduct,
} from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import MetaData from "../layout/Metadata";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./Sidebar";
import LoadingButton from "@mui/lab/LoadingButton";

const ProductList = ({ history }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const alert = useAlert();

    const { error, products } = useSelector((state) => state.products);
    const {
        error: deleteError,
        isDeleted,
        loading,
    } = useSelector((state) => state.product);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Product Deleted Successfully");
            // navigate("/admin/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProduct());
    }, [dispatch, alert, error, deleteError, history, isDeleted]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link
                            to={`/admin/product/${params.getValue(
                                params.id,
                                "id"
                            )}`}
                        >
                            <EditIcon />
                        </Link>

                        {/* <Button
                            className="productListActionBtn"
                            onClick={() =>
                                deleteProductHandler(
                                    params.getValue(params.id, "id")
                                )
                            }
                        >
                            <DeleteIcon />
                        </Button> */}
                        <LoadingButton
                            size="small"
                            onClick={() =>
                                deleteProductHandler(
                                    params.getValue(params.id, "id")
                                )
                            }
                            loading={loading}
                            variant="clear"
                        >
                            <DeleteIcon />
                        </LoadingButton>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin - `} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default ProductList;
