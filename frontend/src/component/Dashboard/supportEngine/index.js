import React, { useRef, useEffect, useState } from "react";

import SupportWindow from './SupportWindow'

import Avatar from './Avatar'
import { useSelector } from 'react-redux';

const SupportEngine = () => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const [visible, setVisible] = useState(false)

    const { isAuthenticated, user } = useSelector((state) => state.user);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setVisible(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <>
        
       {<div ref={wrapperRef}>
           {visible && <SupportWindow visible={visible} />}

            {isAuthenticated===true && user.role==="user" &&  <Avatar 
                onClick={() => setVisible(true)}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    zIndex:'1'
                }}
            />}
        </div>
        }
        </>
    )
}

export default SupportEngine;