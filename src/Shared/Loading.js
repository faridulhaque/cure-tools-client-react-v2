import React from 'react';
import { FadeLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <FadeLoader color={'rgb(178,11,33)'} size={100}></FadeLoader>
        </div>
    );
};

export default Loading;