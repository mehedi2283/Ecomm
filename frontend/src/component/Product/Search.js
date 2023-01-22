import React, { Fragment } from "react";
import "./Search.css";
import Metadata from "./../layout/Metadata";
import { useNavigate } from "react-router-dom";

const Search = ({ keyword, setKeyword }) => {
    const location = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            location(`/products?keyword=${keyword}`);
        } else {
            location("/products");
        }
    };

    return (
        <Fragment>
            <Metadata title="Search  Product -" />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search  Product ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    );
};

export default Search;
