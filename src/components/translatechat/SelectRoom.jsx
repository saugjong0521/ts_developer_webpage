import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from "styled-components"
import Login from '../login/Login';

export default function SelectRoom () {
    const [rooms, setRooms] = useState([]);
    const [createRoom, setCreateRoom] = useState({
        title: '',
        max_users: '',
        password: ''
    })

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [message, setMessage] = useState('');


    // 팝업창 오픈 관련
    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    }
    const handleClosePopup = () => {
        setIsPopupOpen(false);
    }


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

                setMessage('방 생성중 오류 발생')
            }
        };

        bringRooms();
    }, []);




const handleCreateRoom = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('https://bbimt13.net/create_room',
            {
                title: createRoom.title,
                max_users: createRoom.max_users,
                password: createRoom.password,
            },
            {
                headers: {'Content-Type': 'application/json'}
            }
        );

        if (response.data.success) {
            alert(response.data.message);
            setIsPopupOpen(false);
        } else {
            setMessage('방 생성중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error(error);
    }
};

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreateRoom(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };


    return (
        <div className="container">
            <SelectRoomContainer>
            <span>채팅방 목록</span>
            <ul>
                {rooms && rooms.length > 0 ? (
                    rooms.map((rooms) => (
                        <Loomlist key={rooms.id}>
                            <div>
                                {rooms.title}
                            </div>

                            <p>{'>'}</p>
                        </Loomlist>
                    ))
                ) : (
                    <li>채팅방이 없습니다.</li>
                )}
            </ul>
            <CreateRoomPopup onClick={handleOpenPopup}>방 만들기</CreateRoomPopup>
            </SelectRoomContainer>

            {isPopupOpen && (
                <>
                    <ModalBackground onClick={handleClosePopup} />
                    <CreateRoomContainer>
                        <form onSubmit={handleCreateRoom}>
                            <input 
                                type='text' 
                                value={createRoom.title}
                                name='title'
                                placeholder='방 이름을 입력하세요'
                                onChange={handleInputChange}
                            />

                            <input
                                type='number'
                                value={createRoom.max_users}
                                name='max_users'
                                placeholder='최대 인원수를 지정해주세요(2~10)'
                                onChange={handleInputChange}
                                min={2}
                                max={10}
                            />

                            <input
                                type='text'
                                value={createRoom.password}
                                name='password'
                                placeholder='비밀번호를 입력하세요(선택)'
                                onChange={handleInputChange}
                            />

                            {message && <p>{message}</p>}
                            <button type='submit'>방 생성하기</button>
                            <button type='button' onClick={handleClosePopup}>취소하기</button>
                        </form>

                    </CreateRoomContainer>
                </>
            )}

            
        </div>
    );
};

const SelectRoomContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #f5f5f5;

    span {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 20px;
        color: #333;
    }

    ::-webkit-scrollbar {
        display: none;
    }

    ul {
        display: flex;
        width: 500px;
        height: 50%;
        flex-direction: column;
        overflow-y: scroll;
        gap: 20px;

        li {
            display: flex;
            width: 100%;
            height: 60px;
            border-radius: 10px;
            align-items: center;
            background-color: #e0e0e0;
            color: #333;
            padding: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
    }
`;

const Loomlist = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;

    p {
        cursor: pointer;
        &:hover{
            transform: scale(1.3);
            color: #6088dd;
            font-weight: 700;
        }
    }
`;

const CreateRoomPopup = styled.div`
    width: 500px;
    height: 60px;
    position: relative;
    background-color: #888;
    display: flex;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;

    &:hover{
        background-color: #6088dd;
    }
`;

const CreateRoomContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 400px;
    height: auto;
    background-color: #fff;
    border-radius: 10px;
    z-index: 99;

    form {
        display: flex;
        flex-direction: column;
        padding: 20px;
    }

    input {
        margin-bottom: 15px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        color: #333;
        background-color: #f5f5f5;
    }

    p{
        margin-top: 5px;
        margin-bottom: 10px;
        color: #d32f2f;
        text-align: center;
        font-size: 14px;
    }

    button {
        position: relative;
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #888;
        color: white;
        margin: 0;

        &:hover{
            background-color: #3ebe70;
        }
    }

    button[type='button'] {
        background-color: #da959c;
        margin-top: 10px;

        &:hover{
            background-color: #dc3545;
        }
    }
`;

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
`;