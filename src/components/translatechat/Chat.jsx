import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

export default function Chat() {
    const { id: roomId } = useParams();
    const { nickname: userNickName } = useParams();
    const [messages, setMessages] = useState([]);
    
    const socket = new socket("https://bbimt13.net/api/users/online")


    useEffect(() => {

        const timestamp = new Date();

        if(!socket){
            return;
        }

        socket.on('user_joined', {
            user_id: roomId,
            nickname: userNickName,
            timestamp: timestamp
        });
        
        socket.on('receive_original_message', {
            nickname: userNickName,
            message: "",
            timestamp: timestamp
        });

        const handleReceiveMessage = (data) => {
            console.log("Message received:", data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        socket.on("receive_original_message", handleReceiveMessage);


        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        const messageInput = e.target.elements.message;
        if (messageInput.value.trim()) {
            const socket = io("/chat");
            socket.emit("send_message", {
                message: messageInput.value,
                room_id: roomId,
                language: "English",
                tone: "Friendly",
            });
            messageInput.value = "";
        }
    };

    return (
        <div className="container">
            <ChattingRoomContainer>
                <MessageContainer>
                    <ChattingBox>
                        <div className="original-box">
                            {messages.map((msg, index) => (
                                <p key={index}><strong>{msg.nickname}:</strong> {msg.message}</p>
                            ))}
                        </div>
                    </ChattingBox>

                    <MessageBox>
                        <form onSubmit={sendMessage}>
                            <input
                                type="text"
                                name="message"
                                placeholder="메시지를 입력하세요."
                            />
                            <button type="submit">전송</button>
                        </form>
                    </MessageBox>
                </MessageContainer>
            </ChattingRoomContainer>
        </div>
    );
}

const ChattingRoomContainer = styled.div`
    /* Add styles for the chat room container */
`;

const MessageContainer = styled.div`
    /* Add styles for the message container */
`;

const ChattingBox = styled.div`
    /* Add styles for the chatting box */
    .original-box {
        border: 1px solid #ccc;
        padding: 10px;
        height: 300px;
        overflow-y: auto;
        background: #f9f9f9;
    }
`;

const MessageBox = styled.div`
    /* Add styles for the message box */
    form {
        display: flex;
        gap: 10px;
    }

    input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }
`;
