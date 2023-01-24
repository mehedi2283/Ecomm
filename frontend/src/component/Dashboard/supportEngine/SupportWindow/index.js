
import React, { useState } from "react";

import { styles } from "../styles";
import ChatEngine from "./ChatEngine";
import EmailForm from "./EmailForm";

const SupportWindow = props => {
    const [user, setUser] = useState(null)
    const [chat, setChat] = useState(null)
    return (
        <div 
            className='transition-5'
            style={{
                ...styles.supportWindow,
                ...{ opacity: props.visible ? '1' : '0' },
                zIndex:"1"            }}
        >

<EmailForm 
                visible={user === null || chat === null}
                setUser={user => setUser(user)} 
                setChat={chat => setChat(chat)} 
            />

            {
                user !== null && chat !== null &&
                <div>SellPhone Support</div>
            }
              <ChatEngine
                visible={user !== null && chat !== null}
                user={user} 
                chat={chat} 
            />
        </div>
    )
}

export default SupportWindow;