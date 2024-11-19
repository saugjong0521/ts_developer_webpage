import { Link } from "react-router-dom";
import styled from "styled-components";


export default function Home(){
    return(
        <HomeContainer>
            <HomeBox>
                <button className="translatechat-btn">
                    <Link to='/content/translatechat'>TranslateChat</Link>
                </button>
                <button className="doodledraw-btn">
                    <Link to='/content/doodledraw'>DoodleDraw</Link>
                </button>
            </HomeBox>    
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
`;

const HomeBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 150px 200px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

    button {
        border: none;
        border-radius: 5px;
        cursor: pointer;
        padding: 0;

        a {
            display: block;
            text-decoration: none;
            padding: 15px 80px;
            font-size: 18px;
            font-weight: bold;
        }
    }

    .translatechat-btn {
        background-color: #FFD700;
        
        a {
            color: #333;
        }
        
        &:hover {
            background-color: #FFC800;
        }
    }

    .doodledraw-btn {
        background-color: #FF4444;
        
        a {
            color: white;
        }
        
        &:hover {
            background-color: #FF0000;
        }
    }
`;