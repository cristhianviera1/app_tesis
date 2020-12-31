import React, {FunctionComponent, useState} from "react";
import Viewer from 'react-viewer';
import {Message} from "../../pages/chat/ChatDetail";
import './ChatBubble.css'

export interface ChatBubbleInfo {
    position: boolean;
    message: Message;
}

const ChatBubble: FunctionComponent<ChatBubbleInfo> = ({position, message}) => {
    const [viewerImage, setViewerImage] = useState<boolean>(false)

    return (
        <div className={'bubble_container'} style={{textAlign: position ? "left" : 'right'}}>
            {
                message.type === 'text' ?
                    <span className={position ? 'bubble_text_left' : 'bubble_text_right'}>
                        {message.message}
                    </span>
                    :
                    <img
                        style={{maxWidth: '60%'}}
                        className={position ? 'bubble_text_left' : 'bubble_text_right'}
                        onClick={() => setViewerImage(true)}
                        src={message.message} alt={"chat_image"}
                    />
            }
            <Viewer
                visible={viewerImage}
                onClose={() => setViewerImage(false)}
                changeable={false}
                scalable={false}
                noResetZoomAfterChange={true}
                showTotal={false}
                noNavbar={true}
                noImgDetails={true}
                images={[{
                    src: message.message,
                }]}
            />
        </div>
    );
}
export default ChatBubble;
