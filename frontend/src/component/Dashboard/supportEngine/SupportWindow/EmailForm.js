import React, { useState } from "react";

import { styles } from "../styles";

import { LoadingOutlined } from "@ant-design/icons";

import Avatar from "../Avatar";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const EmailForm = (props) => {
    // const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.user);

    function getOrCreateUser(callback) {
        axios
            .put(
                "https://api.chatengine.io/users/",
                { username: user?.email, email: user?.email, secret: user?.email },
                {
                    headers: {
                        "Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY,
                    },
                }
            )
            .then((r) => callback(r.data))
            .catch((e) => console.log("Get or create user error", e));
    }

    function getOrCreateChat(callback) {
        axios
            .put(
                "https://api.chatengine.io/chats/",
                { usernames: [user?.email, "SellPhone"], is_direct_chat: true },
                {
                    headers: {
                        "Project-ID": process.env.REACT_APP_CE_PROJECT_ID,
                        "User-Name": user?.email,
                        "User-Secret": user?.email,
                    },
                }
            )
            .then((r) => callback(r.data))
            .catch((e) => console.log("Get or create chat error", e));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        console.log("Sending Email", user?.email);

        getOrCreateUser((user) => {
            props.setUser && props.setUser(user);
            getOrCreateChat((chat) => {
                setLoading(false);
                props.setChat && props.setChat(chat);
            });
        });
    }

    

    return (
        <div
            style={{
                ...styles.emailFormWindow,
                ...{
                    height: props.visible ? "100%" : "0px",
                    opacity: props.visible ? "1" : "0",
                },
            }}
        >
            <div style={{ height: "0px" }}>
                <div style={styles.stripe} />
            </div>

            <div
                className="transition-5"
                style={{
                    ...styles.loadingDiv,
                    ...{
                        zIndex: loading ? "10" : "-1",
                        opacity: loading ? "0.33" : "0",
                    },
                }}
            />
            <LoadingOutlined
                className="transition-5"
                style={{
                    ...styles.loadingIcon,
                    ...{
                        zIndex: loading ? "10" : "-1",
                        opacity: loading ? "1" : "0",
                        fontSize: "82px",
                        top: "calc(50% - 41px)",
                        left: "calc(50% - 41px)",
                    },
                }}
            />

            <div
                style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <Avatar
                    style={{
                        position: "relative",
                        left: "calc(50% - 44px)",
                        top: "10%",
                    }}
                />

                <div style={styles.topText}>
                    Welcome to SellPhone <br /> support 👋
                </div>

                
                <Button   onClick={(e) => handleSubmit(e)} color="secondary" style={{
                        position: "relative",
                        width: "50%",
                        top: "56.75%",
                    }} variant="contained" size="large">
                    Click Here
                </Button>
            </div>
        </div>
    );
};

export default EmailForm;
