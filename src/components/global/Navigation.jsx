import styled from "styled-components"
import { IoChatboxEllipses } from "react-icons/io5";
import { IoIosColorPalette } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import logo from './logo.png'
import { useNavigation } from './NavigationContext';
import { Link } from "react-router-dom";


export default function Navigation (){
    

    const { isNavVisible, setIsNavVisible } = useNavigation();
    
    return (

        <NaviContainer style={{ display: isNavVisible ? 'flex' : 'none' }}>
        <div className="logo"></div>

            <div className="navigation">
                <ul>
                    <li><button><Link to="/content/translatechat" className="translatechat-btn"><IoChatboxEllipses /></Link></button></li>
                    
                    <li><button><Link to="/content/doodledraw" className="doodledraw-btn"><IoIosColorPalette /></Link></button></li>

                </ul>
            </div>

        <div className="profile-box">
            <div className="profile">profile</div>
            <div className="shrink-btn">
                <button onClick={() => setIsNavVisible(false)}>
                    <IoMdArrowRoundBack />
                </button>
            </div>
        </div>
        </NaviContainer>

    )

}

const NaviContainer = styled.div`

    width: 5vw;
    height: 100vh;
    display: flex;
    background-color: #bbb;
    border: solid 1px #000;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 0 0 0;
    

    .logo{
        width: 70%;
        height: 15vh;
        margin: 0 auto;
        background-image: url(${logo});
        background-repeat: no-repeat;
        background-size: contain;
    }

    ul{
        width: 100%;
        height: 50vh;
        display: flex;
        flex-direction: column;

        li{
            width: 100%;
            height: 10vh;
            display: block;

            button{
                width: 100%;
                height: 100%;
                background-color: #bbb;
                border: none;
                color: #000;
                font-size: 40px;
                cursor: pointer;
                

                a{
                    text-decoration: none;
                    color: inherit;
                }

                
                    .translatechat-btn{
                        &:hover{
                            color: yellow;
                        }
                    }

                    
                    .doodledraw-btn{
                        &:hover{
                            color: red;
                        }
                    }
                        
            }
        }
    }

    .profile-box{
        width: 100%;
        height: 10vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 10px;

        .profile{
            width: 100%;
            height: 80%;            
            display: flex;
            margin: 0 auto;
            justify-content: center;
        }
        
        .shrink-btn{
            width: 100%;
            height: 4vh;
            font-size: 18px;

            button{
                display: flex;
                width: 50%;
                height: 100%;
                right: 0;
                background-color: #bbb;
                cursor: pointer;
                margin: 0 0 0 auto;
                align-items: center;
                justify-content: center;
            }
        }
    }
`