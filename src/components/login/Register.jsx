import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Register() { // 컴포넌트 이름 변경
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
        nickname: '',
    });

    const [message, setMessage] = useState(''); // 서버 메시지를 저장할 상태 추가
    const navigate = useNavigate();

    const handleRegisterSubmit = async (e) => { // 함수 이름 변경
        e.preventDefault();

        try {
            const response = await axios.post("https://bbimt13.net/register", {
                'username': user.username,
                'password': user.password,
                'email': user.email,
                'nickname': user.nickname,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            // 서버의 응답 메시지를 상태에 저장
            setMessage(response.data.message); // 서버에서 반환된 메시지

            if(response.data.success){
                alert('가입 메일이 발송되었습니다.')
                navigate('/')
            }

        } catch (error) {
            console.error(error);
            setMessage('회원가입 중 오류가 발생했습니다.'); // 오류 메시지 설정
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    return (
        <>
            <RegisterForm onSubmit={handleRegisterSubmit}> {/* 폼 이름 변경 */}
                <input 
                    type="text" 
                    name="username" 
                    value={user.username} 
                    placeholder="아이디" 
                    onChange={handleInputChange}
                    required
                />
                <input 
                    type="password" 
                    name="password" 
                    value={user.password} 
                    placeholder="비밀번호" 
                    onChange={handleInputChange}
                    required
                />
                <input 
                    type="email" 
                    name="email" 
                    value={user.email} 
                    placeholder="이메일" 
                    onChange={handleInputChange}
                    required
                />
                <input 
                    type="text" 
                    name="nickname" 
                    value={user.nickname} 
                    placeholder="닉네임" 
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">회원가입</button> {/* 버튼 텍스트 변경 */}
            </RegisterForm>
            {message && <Message>{message}</Message>} {/* 메시지 표시 */}

            <button><Link to='/'>돌아가기</Link></button>
        </>
    );
}

const RegisterForm = styled.form` // 폼 이름 변경
    /* 스타일 추가 가능 */
`;

const Message = styled.div`
    margin-top: 10px;
    color: red; /* 메시지 색상 설정 */
`;