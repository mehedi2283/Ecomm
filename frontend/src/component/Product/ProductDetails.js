import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import ReviewCard from "./ReviewCard.js";
import {
    clearErrors,
    getProductDetails,
    newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "./../layout/Loader/Loader";
import Metadata from "./../layout/Metadata";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Rating,
} from "@mui/material";
import { useAlert } from "react-alert";
import { addItemsToCart } from "./../../actions/cartAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";

const ProductDetails = () => {
    const alert = useAlert();
    let { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );
    console.log(product);

    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );
    const { user } = useSelector((state) => state.user);

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    let [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    // console.log(typeof(rating))

    rating = parseFloat(rating);

    // console.log(typeof(rating))

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
        console.log(open);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));

        setOpen(false);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert, reviewError, success]);

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <Metadata title={`${product.name}`} />
                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options}></Rating>
                                <span>
                                    ({product.numOfReviews}{" "}
                                    {product.numOfReviews > 1
                                        ? "Reviews"
                                        : "Review"}{" "}
                                    )
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>৳{product.price}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>
                                            -
                                        </button>
                                        <input
                                            value={quantity}
                                            type="number"
                                            name=""
                                            readOnly
                                        />
                                        <button onClick={increaseQuantity}>
                                            +
                                        </button>
                                    </div>
                                    <button
                                        disabled={
                                            product.stock < 1 ? true : false
                                        }
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                                <p>
                                    Status:
                                    <b
                                        className={
                                            product.stock < 1
                                                ? "redColor"
                                                : "greenColor"
                                        }
                                    >
                                        {product.stock < 1
                                            ? "OutOfStock"
                                            : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>
                            <button
                                onClick={submitReviewToggle}
                                className="submitReview"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                    <h3 className="reviewsHeading">REVIEWS</h3>
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                                precision={0.5}
                                
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={submitReviewToggle}
                                color="secondary"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={reviewSubmitHandler}
                                color="primary"
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard
                                        key={review._id}
                                        review={review}
                                        user={user}
                                    />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductDetails;
