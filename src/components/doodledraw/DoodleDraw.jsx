import { useEffect, useRef, useState } from "react"
import styled from "styled-components"


export default function DoodleDraw (){

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [ctx, setCtx] = useState();
    const [isDrawing, setIsDrawing] = useState(false);

    const [isSettingBoxVisible, setIsSettingBoxVisible] = useState(true);

    const [activeButton, setActiveButton] = useState(null);

    useEffect(()=>{
        const canvas = canvasRef.current;

                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;

                const context = canvas.getContext("2d");
                context.strokeStyle = "black"
                context.lineWidth = 2.5;
                contextRef.current = context;

                setCtx(contextRef.current)
    },[])



    const startDrawing = ({nativeEvent}) => {
        setIsDrawing(true);
    }

    const stopDrawing = ({nativeEvent}) => {
        setIsDrawing(false);
    }


    const drawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;

        if(ctx){
            if(!isDrawing){
                ctx.beginPath();
                ctx.moveTo(offsetX, offsetY);
            } else{
                ctx.lineTo(offsetX, offsetY)
                ctx.stroke();
            }
        }
    }

    const handleBoxHiddenBtn = () => {
        setIsSettingBoxVisible(!isSettingBoxVisible);
    }

    const handleButtonClick = (buttonName) => {
        setActiveButton(activeButton === buttonName ? null : buttonName);
    };

    return(
        <div className="container">
                    <DrawingCanvas 
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={drawing}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}

                        onTouchStart={startDrawing}
                        onTouchMove={drawing}
                        onTouchEnd={stopDrawing}
                    ></DrawingCanvas>
                    
                    <SettingBox>
                        <DrawSetting isVisible={isSettingBoxVisible}>
                            <button 
                                className="line-thick-btn"
                                onClick={() => handleButtonClick('thickness')}
                            >
                                <SettingDiv isVisible={activeButton === 'thickness'}>
                                    <input className="thickness" type="range" min="1" max="10" step="0.5"/>
                                </SettingDiv>
                            </button>

                            <button className="color-select-btn" onClick={() => handleButtonClick('color')}>
                                <SettingDiv isVisible={activeButton === 'color'}>

                                </SettingDiv>
                            </button>


                            <button className="undo-btn">

                            </button>
                            

                            <button className="clear-btn">

                            </button>


                            <button className="save-btn">

                            </button>
                        </DrawSetting>

                        <button className="setting-hidden-btn" onClick={handleBoxHiddenBtn}>
                                {isSettingBoxVisible}
                        </button>


                    </SettingBox>
        </div>
    )
}

const DrawingCanvas = styled.canvas`
    z-index: 9;
`

const SettingBox = styled.div`
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 10vh;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    gap: 20px;



    button{
        width: 30px;
        height: 30px;
        position: relative;
        visibility: visible;
        border-radius: 50%;
        display: flex;
        background-color: black;
        z-index: 99;
    }


    div{
        width: 20vw;
        height: 30vh;
        /* background-color: #ddd; */
    }
`

const DrawSetting = styled.p`
        display: ${props => props.isVisible ? 'flex' : 'none'};
        gap: 20px;
        justify-content: center;
        align-items: center;
`

const SettingDiv = styled.div`
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ddd;
    border-radius: 8px;
    padding: 10px;
    display: ${props => props.isVisible ? 'block' : 'none'};
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    min-width: 100px;
    z-index: 10;
`
