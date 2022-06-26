import React from 'react';
import Banner from './Banner';
import Contact from './Contact';
import Inventories from './Inventories';
import Reviews from './Reviews';
import Specialty from './Specialty';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Specialty></Specialty>
            <Inventories></Inventories>
            <Reviews></Reviews>
            <Contact></Contact>
        </div>
    );
};

export default Home;