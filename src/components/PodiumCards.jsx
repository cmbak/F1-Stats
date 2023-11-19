import React from 'react';
import PodiumDriverCard from './PodiumDriverCard';

function PodiumCards() {
    return (
        <div className='podium-container'>
            <PodiumDriverCard/>
            <PodiumDriverCard/>
            <PodiumDriverCard/>
        </div>
    )
}

export default PodiumCards;