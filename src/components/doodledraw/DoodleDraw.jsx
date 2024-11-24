import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { MdColorLens } from "react-icons/md";
import { IoMdUndo } from "react-icons/io";
import { FaRegEyeSlash, FaRegEye, FaArrowsRotate } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



export default function DoodleDraw (){

    // 캔버스 관련
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [ctx, setCtx] = useState();
    const [isDrawing, setIsDrawing] = useState(false);


    // 굵기 색 관련 useState
    const [brush, setBrush] = useState(10)
    const [strokeColor, setStrokeColor] = useState("black")



    // 그리기 관련 함수들
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = strokeColor;
        context.lineWidth = brush;
        contextRef.current = context;
    
        setCtx(context);
    }, []);
    

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        if (currentPath.length > 0) {
            saveState();
        }
    
        setIsDrawing(true);
        setCurrentPath([{ x: offsetX, y: offsetY }]); // 새로운 경로 시작
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        if (ctx) {
            ctx.closePath();
            saveState();
        }
    };


    const drawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;

        if(ctx){
            if(!isDrawing){
                ctx.beginPath();
                ctx.moveTo(offsetX, offsetY);
            } else {
                ctx.lineTo(offsetX, offsetY);
                ctx.stroke();
                setCurrentPath(prevPath => [...prevPath, { x: offsetX, y: offsetY }]);
                ctx.beginPath();
                ctx.moveTo(offsetX, offsetY);
            }
        }
    }


    // 굵기, 색관련
    const [paletteColors, setPaletteColors] = useState(["#000000", "#FFFFFF", "#FF5733", "#FFC300", "#DAF7A6"]);
    const [newColor, setNewColor] = useState("#000000");

    const handleBrushChange = (e) => {
        setBrush(e.target.value);
    };

    const handleColorChange = (e) => {
        const selectedColor = e.target.value;
        setNewColor(selectedColor);
    };

    const handleColorAdd = () => {
        setPaletteColors(prevColors => [...prevColors, newColor]);
        setStrokeColor(newColor);
    };

    const handleRemoveColor = (indexToRemove) => {
        setPaletteColors(prevColors => 
            prevColors.filter((_, index) => index !== indexToRemove)
        );
    };



    // undo, reset 버튼
    const [drawingHistory, setDrawingHistory] = useState([]);
    const [currentStep, setCurrentStep] = useState(-1)
    const [currentPath, setCurrentPath] = useState([]);


    const saveState = () => {
        if (currentPath.length > 0) {
            setDrawingHistory((prevHistory) => [
                ...prevHistory.slice(0, currentStep + 1),
                { path: [...currentPath], color: strokeColor, brush }
            ]);
            setCurrentStep((prev) => prev + 1);
        }
        setCurrentPath([]);
    };
    

    const resetCanvas = () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        context.clearRect(0, 0, canvas.width, canvas.height); 
        setDrawingHistory([]);
        setCurrentStep(-1);
    };

    const undoCanvas = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            redrawCanvas();
        }
    };


    const redrawCanvas = () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i <= currentStep; i++) {
            const state = drawingHistory[i];
            context.strokeStyle = state.color;
            context.lineWidth = state.brush;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.beginPath();
            context.moveTo(state.path[0].x, state.path[0].y);
            for (let j = 1; j < state.path.length; j++) {
                context.lineTo(state.path[j].x, state.path[j].y);
            }
            context.stroke();
        }
    };



    // 캔버스 랜더링
    useEffect(() => {
        if (currentStep >= 0) {
            redrawCanvas();
        }
    }, [currentStep]);

    useEffect(() => {
        if (ctx) {
            ctx.lineWidth = brush;
            ctx.strokeStyle = strokeColor;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
        }
    }, [brush, strokeColor]);
    

    console.log(currentStep)



    
    //세팅바 관련 함수들
    const [isSettingBoxVisible, setIsSettingBoxVisible] = useState(true);
    const [activeButton, setActiveButton] = useState(null);


    const handleBoxHiddenBtn = () => {
        setIsSettingBoxVisible(!isSettingBoxVisible);
    }

    const handleButtonClick = (buttonName) => {
        setActiveButton(activeButton === buttonName ? null : buttonName);
    };

    const handleCanvasClick = () => {
        if (activeButton) {
            setActiveButton(null);
        }
    };



    //저장 처리
    const navigate = useNavigate();

    const handleSaveCanvas = async () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL('image/png'); // dataURL을 먼저 정의
        const base64Data = dataURL.replace(/^data:image\/png;base64,/, "");

        try {
            const response = await fetch('http://52.79.232.189:5000/doodle/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: base64Data,
                }),
            });

            if (!response.ok) {
                throw new Error('네트워크 응답이 좋지 않습니다.');
            }

            const data = await response.json();
            console.log('Success:', data);
            navigate('/doodle/question');
        } catch (error) {
            console.error('Error:', error);
        }
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
                        onClick={handleCanvasClick}
                    ></DrawingCanvas>
                    
                    <SettingBox>
                        <DrawSetting isVisible={isSettingBoxVisible}>
                            <button 
                                className="line-thick-btn"
                                onClick={(e) => {
                                    e.stopPropagation();  // 이벤트 전파 방지
                                    handleButtonClick('thickness');
                                }}
                            ><PiPencilSimpleLineFill />
                                <ThicknessPopup 
                                    isVisible={activeButton === 'thickness'}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <p>굵기조절</p>
                                    <input 
                                        className="thickness" 
                                        type="range" 
                                        min="5" 
                                        max="25" 
                                        step="1"
                                        onChange={(e) => {
                                            handleBrushChange(e);
                                        }}
                                        value={brush}
                                    />
                                </ThicknessPopup>
                            </button>


                            <button 
                                className="color-select-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleButtonClick('color');
                                }}
                            ><MdColorLens />
                                <ColorPopup
                                    isVisible={activeButton === 'color'}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <MoreColorPalette>
                                    <input 
                                        type="color"
                                        value={newColor}
                                        onChange={(e) => {
                                            handleColorChange(e);
                                        }}
                                    />
                                    <div 
                                        onClick={(e) => {
                                            handleColorAdd();
                                        }}
                                    >
                                        저장
                                    </div>
                                    </MoreColorPalette>
                                    <ColorPalette>
                                    {paletteColors.map((color, index) => (
                                            <ColorItems 
                                                key={index}
                                                onClick={() => {
                                                    setStrokeColor(color);
                                                    if (ctx) ctx.strokeStyle = color;
                                                }}
                                                $color={color}
                                                $isSelected={strokeColor === color}
                                            >
                                                <RemoveColor
                                                     onClick={(e) => {
                                                        handleRemoveColor(index);
                                                    }}
                                                >x</RemoveColor>
                                            </ColorItems>
                                        ))}
                                    </ColorPalette>
                                </ColorPopup>
                            </button>


                            <button className="undo-btn" onClick={undoCanvas}>
                            <IoMdUndo />
                            </button>
                            

                            <button className="clear-btn" onClick={resetCanvas}>
                            <FaArrowsRotate />
                            </button>


                            <button className="save-btn" onClick={handleSaveCanvas}>
                            <FaSave />
                            </button>
                        </DrawSetting>

                        <button 
                            className="setting-hidden-btn" 
                            onClick={(e) => {
                                handleBoxHiddenBtn();
                            }}
                        >
                            {isSettingBoxVisible? <FaRegEyeSlash /> : <FaRegEye />}
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
    height: 20vh;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    gap: 20px;

    button{
        width: 40px;
        height: 40px;
        position: relative;
        visibility: visible;
        border-radius: 50%;
        display: flex;
        background-color: #ddd;
        font-size: 35px;
        justify-content: center;
        align-items: center;
        z-index: 99;
        
        &:hover{
            color: blue;
        }
    }
`

const DrawSetting = styled.p`
        display: ${props => props.isVisible ? 'flex' : 'none'};
        gap: 20px;
        justify-content: center;
        align-items: center;
`

const ThicknessPopup = styled.div`
    position: absolute;
    width: 20vw;
    height: 10vh;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ddd;
    border-radius: 8px;
    display: ${props => props.isVisible ? 'flex' : 'none'};
    z-index: 10;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 18px;
    font-weight: 700;
    gap: 10px;
    margin-bottom: 10px;

    input{
        width: 80%;
    }

    p{
        color: black;
    }

`

const ColorPopup = styled.div`
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ddd;
    border-radius: 8px;
    display: ${props => props.isVisible ? 'flex' : 'none'};
    z-index: 10;
    width: 20vw;
    height: 30vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
`

const MoreColorPalette = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    input::-webkit-color-swatch{
        border-radius: 50%;
        border: none;
    }

    input{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
    }

    div{
        height: 40px;
        border: 1px solid black;
        display: flex;
        align-items: center;
        font-size: 18px;
        padding: 4px;
        background-color: #2bbe2b;
        cursor: pointer;
        &:hover{
            background-color: #01b801;
        }

    }

`

const ColorPalette = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    gap: 10px;
    background-color: white;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const ColorItems = styled.button.attrs(props => ({
    style: {
        backgroundColor: props.$color
    }
}))`
    border: ${props => props.$isSelected ? "2px" : "1px"} ${props => props.$isSelected ? 'solid' : "dashed" } black;

    &:hover {
        transform: scale(1.1);
    }
`

const RemoveColor = styled.p`

    position: absolute;
    right: -5px;
    top: -5px;
    display: flex;
    color: red;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.5);
    }
    
`