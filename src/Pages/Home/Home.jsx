import React from 'react';
import Banner from '../Banner/Banner';
import PremiumCard from './PremiumCard';
import HowItWorks from './HowItWorks';
import BioDataCounter from './BioDataCounter';
import SuccessMarriage from './SuccessMarriage';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PremiumCard></PremiumCard>
            <HowItWorks></HowItWorks>
            <BioDataCounter></BioDataCounter>
            <SuccessMarriage></SuccessMarriage>
        </div>
    );
};

export default Home;