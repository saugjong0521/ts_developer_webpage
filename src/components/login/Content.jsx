import { Outlet } from "react-router-dom";
import Navigation from "../global/Navigation";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigation } from "../global/NavigationContext";
import styled from "styled-components";

export default function Content() {
    const { isNavVisible, setIsNavVisible } = useNavigation();

    return (
        <ContentContainer>
            <div style={{ display: 'flex' }}>
                <Navigation />
                <MainContent isNavVisible={isNavVisible}>
                    {!isNavVisible && (
                        <button 
                            onClick={() => setIsNavVisible(true)}>
                            <IoMdArrowRoundBack 
                                style={{ 
                                    transform: 'rotate(180deg)',
                                    fontSize: '18px'
                                }}  
                            />
                        </button>
                    )}
                    <Outlet />
                </MainContent>
            </div>
        </ContentContainer>
    );
}

const ContentContainer = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

const MainContent = styled.div`
    height: 100vh;
    transition: width 0.3s ease;
    overflow-y: auto;
    overflow-x: hidden;
    width : ${(props) => (props.isNavVisible ? "95vw" : "100vw")};
    
    button{
        position: fixed;
        left: 0;
        top: 0;
        background-color: transparent;
        cursor: pointer;
    }
`;