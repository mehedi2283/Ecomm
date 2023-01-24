import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct, createProductBySeller } from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/Metadata";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstant";
import { useNavigate } from "react-router-dom";
import NewProductAddLoader from "./NewProductAddLoader";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import SidebarForSeller from './SidebarForSeller';

const NewProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector(
        (state) => state.newProductForseller
    );
    const { user} = useSelector(
        (state) => state.user
    );

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

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

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Product Created Successfully");
            navigate(`/seller/products/${user?._id}`);
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, navigate, success,user?._id]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(createProductBySeller(myForm));
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    // console.log(images, imagesPreview);

    return (
        <Fragment>
            <MetaData title="Create Product - " />
            <div className="dashboard">
                <SidebarForSeller />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        {loading ? (
                            <NewProductAddLoader className="addPLoader"></NewProductAddLoader>
                        ) : (
                            <div>
                                <h1>Create Product</h1>

                                <div>
                                    <SpellcheckIcon />
                                    <input
                                        type="text"
                                        placeholder="Product Name"
                                        required
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <AttachMoneyIcon />
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        required
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <DescriptionIcon />

                                    <textarea
                                        placeholder="Product Description"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        cols="30"
                                        rows="1"
                                    ></textarea>
                                </div>

                                <div>
                                    <AccountTreeIcon />
                                    <select
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Choose Category
                                        </option>
                                        {categories.map((cate) => (
                                            <option key={cate} value={cate}>
                                                {cate}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* <div>
    <StorageIcon />
    <input
        type="number"
        placeholder="Stock"
        // required
        onChange={(e) => setStock(e.target.value)}
    />
</div> */}

                                <div id="createProductFormFile">
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={createProductImagesChange}
                                        multiple
                                    />
                                </div>

                                <div id="createProductFormImage">
                                    {imagesPreview.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt="Product Preview"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button> */}
                        <LoadingButton
                            color="secondary"
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            type="submit"
                            id="createProductBtn"
                            disabled={loading ? true : false}
                        >
                            <span>Save</span>
                        </LoadingButton>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewProduct;
