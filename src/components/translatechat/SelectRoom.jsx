import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from "styled-components"

export default function SelectRoom () {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const bringRooms = async () => {
            try {
                const response = await axios.get('https://bbimt13.net/room_list');
                if (response.data.success) {
                    setRooms(response.data.rooms);
                } else {
                    console.error('API 호출 실패:', response.data.message);
                }
            } catch (error) {
                console.error('API 호출 중 에러 발생:', error);
            }
        };

        bringRooms();
    }, []);

    return (
        <div className="container">
            <ul>
                {rooms && rooms.length > 0 ? (
                    rooms.map((rooms) => (
                        <Loomlist key={rooms.id}>
                            <div>
                                {rooms.title}
                            </div>
                        </Loomlist>
                    ))
                ) : (
                    <li>채팅방이 없습니다.</li>
                )}
            </ul>
            <CreateRoom />
        </div>
    );
};

const Loomlist = styled.li`
    
 `

 const CreateRoom = styled.button`
    
 `