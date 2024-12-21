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
            const response = await axios.post("https://bbimt13.net/api/auth/register", {
                'username': user.username,
                'password': user.password,
                'email': user.email,
                'nickname': user.nickname,
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
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
        <Container>
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
                <LoginLink to='/'>돌아가기</LoginLink>
            </RegisterForm>
            {message && <Message>{message}</Message>} {/* 메시지 표시 */}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
`;

const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    max-width: 400px;
    padding: 30px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    input {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
        transition: border-color 0.3s;

        &:focus {
            outline: none;
            border-color: #666;
        }
    }

    button {
        padding: 12px;
        background-color: #333;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #555;
        }
    }
`;

const Message = styled.div`
    margin-top: 15px;
    color: #d32f2f;
    font-size: 14px;
    text-align: center;
`;

const LoginLink = styled(Link)`
    background-color: #888;
    color: #fff;
    text-decoration: none;
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    transition: all 0.3s ease;
    font-weight: 500;

    &:hover {
        background-color: #ccc;
        color: #222;
    }
`;