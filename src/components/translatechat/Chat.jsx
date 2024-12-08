import { useEffect } from "react"
import { io } from "socket.io-client"
import styled from "styled-components"
import { useParams } from 'react-router-dom';


export default function Chat (){
    const { id: roomId } = useParams();
    console.log("Room ID:", roomId);

    useEffect(() => {
        const socket = io("/chat")



        // const socketJoin = () => {
        //     socket.emit("join", {room_id: roomId})
        // }
    
        // const socketLeave = () => {
        //     socket.emit("leave", {room_id: roomId})
        // }
      



    })
    


    return(
        <div className="container">
            <ChattingRoomContainer>
                



                <MessageContainer>
                    <ChattingBox>
                        <div className="translate-box"></div>
                        <div className="original-box"></div>
                    </ChattingBox>

                    <MessageBox>
                        <form>
                            <input
                                type="text"
                                placeholder="메시지를 입력하세요."
                            />
                            <button
                            
                            />
                        </form>
                    </MessageBox>

                </MessageContainer>
            </ChattingRoomContainer>
        </div>
    )


}

const ChattingRoomContainer = styled.div`
    
`


const MessageContainer = styled.div`
    
`

const ChattingBox = styled.div`
    
`

const MessageBox = styled.div`
    
`