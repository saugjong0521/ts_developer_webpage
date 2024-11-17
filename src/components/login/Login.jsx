import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";


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
        const response = await axios.post("https://bbimt13.net/login", {
            'username': login.username,
            'password': login.password,
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        setMessage(response.data.message);
        if (response.data.success){
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
        <>
        <LoginForm onSubmit={handleLoginSubmit}>
            <input 
                type="text" 
                name="username"
                value={login.username} 
                placeholder="아이디를 입력하세요"
                onChange={handleInputChange}    
            ></input>

            <input 
                type="password"
                name="password" 
                value={login.password} 
                placeholder="비밀번호를 입력하세요"
                onChange={handleInputChange}
            ></input>
            
            <button type="submit">로그인</button>
            {message && <Message>{message}</Message>} {/* 메시지 표시 */}
        </LoginForm>

        <button>
            <Link to='register'>가입하기</Link>
        </button>
        </>
    )

}

const LoginForm = styled.form`
`

const Message = styled.div`
    margin-top: 10px;
    color: red; /* 메시지 색상 설정 */
`;