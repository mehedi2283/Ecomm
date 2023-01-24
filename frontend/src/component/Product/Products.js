import React, { useEffect, useState } from "react";
import Loader from "./../layout/Loader/Loader";
import { Fragment } from "react";
import Metadata from "../layout/Metadata";
import ProductCard from "./../Home/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./Products.css";
import { clearErrors, getProducts } from "./../../actions/productAction";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Rating, Typography } from "@mui/material";
import Slider from "@material-ui/core/Slider";

const categories = [
    // "Laptop",
    // "Footwear",
    // "Bottom",
    // "Tops",
    // "Attire",
    // "Camera",
    // "SmartPhones",
    "Low-Budget",
    "Entry-Level",
    "High-Budget",
];

const Products = ({ keyword }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 30000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    // console.log(ratings);

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    } = useSelector((state) => state.products);

    if (ratings === null) {
        setRatings(0);
    }

    // const { keyword } = useParams();
    // console.log(keyword)

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    // console.log(price);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProducts(keyword, currentPage, price, category, ratings));
    }, [
        dispatch,
        keyword,
        currentPage,
        alert,
        error,
        price,
        category,
        ratings,
    ]);
    

    const removeQuery = () => {
        window.location.reload();
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <Metadata title="PRODUCTS -" />
                    <h2 className="productsHeading">Products</h2>

                    <div className="products">
                        {products &&
                            products?.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                    </div>

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        
                        <Slider
                            size="small"
                            value={price}
                            onChangeCommitted={priceHandler}
                            valueLabelDisplay="auto"
                            // getAriaLabel={() => "Minimum distance shift"}
                            // aria-labelledby="range-slider"
                            min={0}
                            max={30000}
                        />
                       

                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                            <Link
                                onClick={removeQuery}
                                className="category-link"
                            >
                                All-Products
                            </Link>
                        </ul>

                        <fieldset>
                            <Typography component="legend">
                                Ratings Above
                            </Typography>
                            <Rating
                                precision={0.5}
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                // aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>
                    {resultPerPage < productsCount && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Products;
