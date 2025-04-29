import React from 'react';
import Banner from '../Banner/Banner';
import PremiumCard from './PremiumCard';
import HowItWorks from './HowItWorks';
import BioDataCounter from './BioDataCounter';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PremiumCard></PremiumCard>
            <HowItWorks></HowItWorks>
            <BioDataCounter></BioDataCounter>
        </div>
    );
};

export default Home;