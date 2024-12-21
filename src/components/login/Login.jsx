import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import CryptoJS from "crypto-js" 페이로드 암호화 서버작업 먼저


export default function Login (){

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        username: '',
        password: '',
    })

    const [message, setMessage] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try{
        const response = await axios.post("https://bbimt13.net/api/auth/login", {
            'username': login.username,
            'password': login.password,
        }, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });

        setMessage(response.data.message);
        if (response.data.success){
            console.log(response.data)
            navigate('/home')
        }

    } catch(error){
        console.error(error)
        setMessage('로그인중 오류가 발생했습니다.')
    }

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogin(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };


    return(
        <Container>
            <LoginForm onSubmit={handleLoginSubmit}>
                <input 
                    type="text" 
                    name="username"
                    value={login.username} 
                    placeholder="아이디를 입력하세요"
                    onChange={handleInputChange}
                />
                <input 
                    type="password"
                    name="password" 
                    value={login.password} 
                    placeholder="비밀번호를 입력하세요"
                    onChange={handleInputChange}
                />
                <button type="submit">로그인</button>
                {message && <Message>{message}</Message>}
                <RegisterLink to='register'>가입하기</RegisterLink>
            </LoginForm>
        </Container>
    )

}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
    gap: 20px;

    button {
        background-color: #333;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            background-color: #555;
        }

        a {
            color: white;
            text-decoration: none;
            font-size: 16px;
        }
    }
`

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;

    input {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
        transition: border-color 0.3s ease;

        &:focus {
            outline: none;
            border-color: #666;
        }
    }

    button {
        background-color: #222;
        color: white;
        padding: 12px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #444;
        }
    }
`

const Message = styled.div`
    margin-top: 5px;
    color: #d32f2f;
    text-align: center;
    font-size: 14px;
`;

const RegisterLink = styled(Link)`
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