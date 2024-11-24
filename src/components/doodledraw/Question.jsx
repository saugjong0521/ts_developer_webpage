import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
`;

const ImageContainer = styled.div`
    margin: 20px 0;
`;

const LoadingOverlay = styled.div`
    display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const LoadingSpinner = styled.div`
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const Analysis = styled.div`
    margin: 20px 0;
`;

const Elements = styled.div`
    margin: 20px 0;
`;

const Question = styled.div`
    margin: 20px 0;
`;

const ImageAnalysis = ({ imageUrl, analysis, elements, questions }) => {
    const [selections, setSelections] = useState({});
    const [loading, setLoading] = useState(false);

    const handleOptionChange = (questionIndex, value) => {
        setSelections((prev) => ({
            ...prev,
            [questionIndex]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(selections).length !== questions.length) {
            alert("모든 질문에 답변해 주세요.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://52.79.232.189:5000/doodle/submit_answers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selections }),
            });

            if (!response.ok) {
                throw new Error('서버 응답이 올바르지 않습니다.');
            }

            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                window.location.href = data.output_image_url;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('오류가 발생했습니다: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <h2>이미지 분석 결과</h2>
            <ImageContainer>
                <img src={imageUrl} alt="Uploaded Image" className="uploaded-image" />
            </ImageContainer>

            <Analysis>
                <h3>분석:</h3>
                <p>{analysis}</p>
            </Analysis>

            <Elements>
                <h3>주요 요소:</h3>
                <ul>
                    {elements.map((element, index) => (
                        <li key={index}>
                            <strong>{element.element}:</strong> {element.interpretation}
                        </li>
                    ))}
                </ul>
            </Elements>

            <h3>추가 질문:</h3>
            <form id="questionForm" onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                    <Question className={`question question-${index}`} key={index}>
                        <h4>{question.question}</h4>
                        {question.options.map((option, optionIndex) => (
                            <label className={`option-label question-${index}-option-${optionIndex + 1}`} key={optionIndex}>
                                <input
                                    type="radio"
                                    name={`question${index}`}
                                    value={option}
                                    onChange={() => handleOptionChange(index, option)}
                                />
                                {option}
                            </label>
                        ))}
                    </Question>
                ))}
                <button type="submit">제출</button>
            </form>

            <LoadingOverlay isVisible={loading}>
                <LoadingSpinner />
                <p>이미지를 생성하는 중입니다...</p>
            </LoadingOverlay>
        </Container>
    );
};

export default ImageAnalysis;