import React, {FunctionComponent} from "react";
import {IonItem, IonLabel} from "@ionic/react";
import './ChatBubble.css'

interface Message {
    type: "text" | "image";
    message: string;
}

export interface ChatBubbleInfo {
    color: string;
    position: boolean;
    message: Message;
}

const ChatBubble: FunctionComponent<ChatBubbleInfo> = ({color, position, message}) => {
    return (
        <div className={"chat-container"}>
            <IonItem className={"chat-item"}>
                <IonLabel>
                    <p>"ola bb con todo jespeto"</p>
                </IonLabel>
            </IonItem>
        </div>
    );
}
export default ChatBubble;
