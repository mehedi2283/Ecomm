import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { redirect } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin }) => {
    const { loading, isAuthenticated, user } = useSelector(
        (state) => state.user
    );

    // console.log(user?.role);

    const location = useLocation();

    if (loading === true) {
        return <Loader></Loader>;
    }

    if (loading === false && isAuthenticated === false) {
        return (
            <Navigate to="/login" state={{ from: location }} replace>
                {redirect("/login")}
            </Navigate>
        );
    }
    if (loading === false && isAdmin === true && user.role !== "seller") {
        return (
            <Navigate to="/login" state={{ from: location }} replace>
                {redirect("/login")}
            </Navigate>
        );
    }

    return children;
};

export default ProtectedRoute;
