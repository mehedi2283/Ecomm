import { useEffect, React, useState } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import store from "./store";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Routes,
} from "react-router-dom";
import Home from "./component/Home/Home";
import Profile from "./component/User/Profile.js";
import ProductDetails from "./component/Product/ProductDetails";
import LoginSignUp from "./component/User/LoginSignUp";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Routes/ProtectedRoute";
import ProtectedRouteForSeller from "./component/Routes/ProtectedRouteForSeller.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Dashboard/Dasboard.js";
import Productlist from "./component/Dashboard/Productlist.js";
import ProductlistforSeller from "./component/Dashboard/ProductlistforSeller.js";
import NewProductForSeller from "./component/Dashboard/NewProductForSeller.js";
import NewProduct from "./component/Dashboard/NewProduct.js";
import UpdateProduct from "./component/Dashboard/UpdateProduct.js";
import UpdateSellerProduct from "./component/Dashboard/UpdateSellerProduct.js";
import OrderList from "./component/Dashboard/OrderList.js";
import ProcessOrder from "./component/Dashboard/ProcessOrder.js";
import UserList from "./component/Dashboard/UserList.js";
import UpdateUser from "./component/Dashboard/UpdateUser.js";
import ProductReviews from "./component/Dashboard/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound.js";
import SupportEngine from "./component/Dashboard/supportEngine";
import SupportAdmin from './component/Dashboard/SupportAdmin/index';

function App() {
    const [keyword, setKeyword] = useState("");
    const [stripeApiKey, setStripeApiKey] = useState("");

    async function getStripeApiKey() {
        const { data } = await axios.get("/api/v1/stripeapikey");

        setStripeApiKey(data.stripeApiKey);
    }

    const { isAuthenticated, user } = useSelector((state) => state.user);
    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"],
            },
        });

        store.dispatch(loadUser());

        getStripeApiKey();
    }, []);

    window.addEventListener("contextmenu", (e) => e.preventDefault());

    return (
        <Router>
            <Header></Header>
            <SupportEngine style={{zIndex:"40"}}></SupportEngine>
            {isAuthenticated && <UserOptions user={user}></UserOptions>}
            <Routes>
                <Route path="/" element={<Home></Home>} />

                <Route
                    path="/account"
                    element={
                        <ProtectedRoute>
                            <Profile></Profile>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/support"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <SupportAdmin></SupportAdmin>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute isAdmin={true} isSeller={true}>
                            <Dashboard></Dashboard>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/product"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <NewProduct></NewProduct>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/products"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <Productlist></Productlist>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/product/:id"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <UpdateProduct></UpdateProduct>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/orders"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <OrderList></OrderList>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/order/:id"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <ProcessOrder></ProcessOrder>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <UserList></UserList>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/user/:id"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <UpdateUser></UpdateUser>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/reviews"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <ProductReviews></ProductReviews>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/seller/newProduct"
                    element={
                        <ProtectedRouteForSeller isAdmin={true}>
                            <NewProductForSeller></NewProductForSeller>
                        </ProtectedRouteForSeller>
                    }
                />
                <Route
                    path="/seller/products/:id"
                    element={
                        <ProtectedRouteForSeller isAdmin={true}>
                            <ProductlistforSeller></ProductlistforSeller>
                        </ProtectedRouteForSeller>
                    }
                />
                <Route
                    path="/seller/product/:id"
                    element={
                        <ProtectedRouteForSeller isAdmin={true}>
                            <UpdateSellerProduct></UpdateSellerProduct>
                        </ProtectedRouteForSeller>
                    }
                />

                <Route
                    path="/me/update"
                    element={
                        <ProtectedRoute>
                            <UpdateProfile></UpdateProfile>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/password/update"
                    element={
                        <ProtectedRoute>
                            <UpdatePassword></UpdatePassword>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/shipping"
                    element={
                        <ProtectedRoute>
                            <Shipping></Shipping>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/order/confirm"
                    element={
                        <ProtectedRoute>
                            <ConfirmOrder></ConfirmOrder>
                        </ProtectedRoute>
                    }
                />

                {stripeApiKey && (
                    <Route
                        path="/process/payment"
                        element={
                            <ProtectedRoute>
                                <Elements stripe={loadStripe(stripeApiKey)}>
                                    <Payment></Payment>
                                </Elements>
                            </ProtectedRoute>
                        }
                    />
                )}
                <Route
                    path="/success"
                    element={
                        <ProtectedRoute>
                            <OrderSuccess></OrderSuccess>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <MyOrders></MyOrders>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/order/:id"
                    element={
                        <ProtectedRoute>
                            <OrderDetails></OrderDetails>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/password/forgot"
                    element={<ForgotPassword></ForgotPassword>}
                />

                <Route
                    path="/password/reset/:token"
                    element={<ResetPassword></ResetPassword>}
                />

                {/* <Route path="/account" element={user?<Profile></Profile>:<LoginSignUp></LoginSignUp>} /> */}
                <Route
                    path="/product/:id"
                    element={<ProductDetails></ProductDetails>}
                />
                <Route
                    path="products/product/:id"
                    element={<ProductDetails></ProductDetails>}
                />
                <Route
                    path={`products/${keyword}/product/:id`}
                    element={<ProductDetails></ProductDetails>}
                />
                <Route
                    path="/products"
                    element={<Products keyword={keyword}></Products>}
                />
                <Route
                    path="/products/:keyword"
                    element={<Products></Products>}
                />
                <Route
                    path="/search"
                    element={
                        <Search
                            keyword={keyword}
                            setKeyword={setKeyword}
                        ></Search>
                    }
                />
                <Route path="/login" element={<LoginSignUp></LoginSignUp>} />
                <Route path="/cart" element={<Cart></Cart>} />
                <Route path="/contact" element={<Contact></Contact>} />
                <Route path="/about" element={<About></About>} />
                <Route
                    element={
                        window.location.pathname ===
                        "/process/payment" ? null : (
                            <NotFound></NotFound>
                        )
                    }
                />
            </Routes>
            <Footer></Footer>
        </Router>
    );
}

export default App;
