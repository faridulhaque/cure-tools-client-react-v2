import React from 'react';
import Banner from './Banner';
import Inventories from './Inventories';
import Specialty from './Specialty';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Specialty></Specialty>
            <Inventories></Inventories>
        </div>
    );
};

export default Home;