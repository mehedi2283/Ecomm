import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import { clearErrors, getProducts } from "./../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts());
    }, [dispatch, error, alert]);
    // const product = {
    //     name: "iPhone 14 Pro",
    //     images: [
    //         {
    //             url: "https://admin.sumashtech.com/media/image/main/iPhone-14-Pro-Deep-Purple-2099.jpg",
    //         },
    //     ],
    //     price: "৳200000",
    //     _id: "wow",
    // };

    return (
        <Fragment>
            {loading ? (
                <Loader></Loader>
            ) : (
                <Fragment>
                   
                     <Metadata title={``} />
                    {/* {products &&
                        products.map((product) => console.log(product))} */}
                    <div className="banner">
                        <p>Welcome to SellPhone</p>
                        <h1>FIND AMAZING PHONES BELOW</h1>

                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {products &&
                            products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                    </div>
                   
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;
