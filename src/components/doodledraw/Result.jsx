import React from 'react';

const GeneratedImage = ({ outputImageUrl }) => {
    const handleRedraw = () => {
        window.location.href = '/';
    };

    return (
        <div>
            <h2>생성된 이미지</h2>
            <img src={outputImageUrl} alt="Generated Image" />
            <br />
            <button onClick={handleRedraw}>다시 그리기</button>
        </div>
    );
};

export default GeneratedImage;