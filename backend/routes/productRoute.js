const express = require("express");
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
    getProductReviews,
    deleteReview,
    getAdminProducts,
    getSellerProducts,
    createProductForSeller,
    updateSellerProduct,
} = require("../controllers/productsController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/products").get(isAuthenticatedUser,authorizedRoles( "admin"), getAdminProducts);

router.route("/seller/products/:id").get(isAuthenticatedUser,authorizedRoles( "seller"), getSellerProducts);

router
    .route("/admin/product/new")
    .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);

router
    .route("/seller/product/new")
    .post(isAuthenticatedUser, authorizedRoles("seller"), createProductForSeller);

router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);

router
    .route("/seller/product/:id")
    .put(isAuthenticatedUser, authorizedRoles("seller"), updateSellerProduct)
    .delete(isAuthenticatedUser, authorizedRoles("seller"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
    .route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
