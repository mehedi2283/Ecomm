import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Metadata";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaymentLoader from "./PaymentLoader.js";
import Loader from "../layout/Loader/Loader";

const Payment = () => {
    const [buttonLoading, setButtonLoading] = useState(false);
    // function handleClick() {
    //     setButtonLoading(true);
    // }
    const [loadPayment, setLoadPayment] = useState(false);
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user, loading } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setButtonLoading(true);

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            setLoadPayment(true);

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;
                setLoadPayment(false);
                setButtonLoading(false);

                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    console.log(loadPayment);

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(createOrder(order));
                    setLoadPayment(false);
                    setButtonLoading(false);
                    payBtn.current.disabled = false;

                    navigate("/success");
                } else {
                    alert.error("There's some issue while processing payment ");
                }
            }
        } catch (error) {
            setLoadPayment(false);
            setButtonLoading(false);
            console.log(error);
            payBtn.current.disabled = false;
            console.log(loadPayment);
            alert.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (error) {
            setLoadPayment(false);
            setButtonLoading(false);
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            {loading ? (
                <Loader></Loader>
            ) : (
                <Fragment>
                    <MetaData title="Payment" />
                    <CheckoutSteps activeStep={2} />

                    <div className="paymentContainer">
                        <form
                            className="paymentForm"
                            onSubmit={(e) => submitHandler(e)}
                        >
                            <Typography>Card Info</Typography>
                            {loadPayment ? (
                                <PaymentLoader></PaymentLoader>
                            ) : (
                                <div>
                                    <div>
                                        <CreditCardIcon />
                                        <CardNumberElement className="paymentInput" />
                                    </div>
                                    <div>
                                        <EventIcon />
                                        <CardExpiryElement className="paymentInput" />
                                    </div>
                                    <div>
                                        <VpnKeyIcon />
                                        <CardCvcElement className="paymentInput" />
                                    </div>
                                </div>
                            )}

                            {/* <input
                                type="submit"
                                value={`Pay - ৳${
                                    orderInfo && orderInfo.totalPrice
                                }`}
                                ref={payBtn}
                                className="paymentFormBtn"
                                // disabled
                            ></input> */}
                            <LoadingButton
                                ref={payBtn}
                                color="secondary"
                                onClick={submitHandler}
                                loading={buttonLoading}
                                loadingPosition="start"
                                startIcon={<LocalAtmIcon />}
                                variant="contained"
                                type="submit"
                                className="paymentFormBtn"
                            >
                                <span>{`Pay - ৳${
                                    orderInfo && orderInfo.totalPrice
                                }`}</span>
                            </LoadingButton>
                        </form>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Payment;
