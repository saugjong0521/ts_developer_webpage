import axios from "axios"
import { useState, useEffect } from "react"
import styled from "styled-components"





 export default function SelectRoom () {

    const [room, setRoom] = useState({
        "id": '',
        "title": '',
        description: '',
        max_users: '',
        current_users: '',
    })

    const [chatrooms, setChatrooms] = useState([]); // 추가: 채팅방 목록 상태


    const bringroom = async () => {
        try {
            const response = await axios.get("https://bbimt13.net/chat_rooms/list", {
                headers: { 'Content-Type': 'application/json' }
            });
            setChatrooms(response.data.rooms); // 수정: 응답에서 rooms 배열을 사용하여 상태 업데이트
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        bringroom();
    }, []);
    return(
        <div className="container">
            <ul>
            {chatrooms.map((room) => (
                    <Loomlist>
                            <div key={room.id}>
                                {room.title} - {room.description} (최대: {room.max_users}, 현재: {room.current_users})
                            </div>
                    </Loomlist>
                ))}
            </ul>

            <CreateRoom>

            </CreateRoom>
        </div>
    )


 }

 const Loomlist = styled.li`
    
 `

 const CreateRoom = styled.button`
    
 `