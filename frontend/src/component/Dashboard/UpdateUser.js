import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Button from '@mui/material/Button';
import MetaData from "../layout/Metadata";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
import {
    getUserDetails,
    updateUser,
    clearErrors,
    loadUser,
} from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import NewProductAddLoader from './NewProductAddLoader';

const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    const navigate = useNavigate();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { user: isAdmin } = useSelector((state) => state.user);

    const {
        loading: updateLoading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const userId = id;

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }


        if (isAdmin.role !== "admin") {
            navigate("/account");
        }
        if (isUpdated) {
            alert.success("User Updated Successfully");
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
            dispatch(getUserDetails(userId));
            dispatch(loadUser());
        }
    }, [
        dispatch,
        alert,
        error,
        navigate,
        isUpdated,
        updateError,
        user,
        userId,
        isAdmin,
    ]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(userId, myForm));
    };

    return (
        <Fragment>
            <MetaData title="Update User - " />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {/* {loading ? (
                        <Loader />
                    ) : ( */}
                        <form
                            className="createProductForm"
                            onSubmit={updateUserSubmitHandler}
                        >
                            {loading?<NewProductAddLoader></NewProductAddLoader>:<div>
                                <h1>Update User</h1>

                                <div>
                                    <PersonIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <VerifiedUserIcon />
                                    <select
                                        value={role}
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                    >
                                        <option value="">Choose Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="seller">Seller</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                            </div>}

                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={
                                    updateLoading
                                        ? true
                                        : false || role === ""
                                        ? true
                                        : false
                                }
                            >
                                Update
                            </Button>
                        </form>
                    {/* )} */}
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateUser;
