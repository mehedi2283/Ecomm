import React, { useState } from "react";
import { styles } from './styles'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const Avatar = props => {
    const [hovered, setHovered] = useState(false)

    return (
        <div  style={props.style}>
            {
                hovered && 
                <div 
                className='transition-3'
                style={{
                    ...styles.avatarHello,
                    ...{ opacity: hovered ? '1' : '0' },
                    display:"flex",
                    alignItems: "center",
                    gap:"5px"
                }}
            >
                 Support  <SupportAgentIcon></SupportAgentIcon>
            </div>

            }
            <div 
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => props.onClick && props.onClick()}
                className='transition-3'
                style={{
                    ...styles.chatWithMeButton,
                    ...{ border: hovered ? '2px solid #f9f0ff' : '2px solid #7a39e0' }
                }}
            />
        </div>
    )
}

export default Avatar;