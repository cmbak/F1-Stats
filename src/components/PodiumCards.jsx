import React from 'react';
import PodiumDriverCard from './PodiumDriverCard';

// Is there a way to change styling depending on (in this case) position?
// - E.g. want no 1 to be above the others? How would this work?

const YEAR = 2023;

function PodiumCards() {
    return (
        <div className='podium-container'>
            <PodiumDriverCard key={2} position={2} year={YEAR} id={2}/>
            <PodiumDriverCard key={1} position={1} year={YEAR} id={1}/>
            <PodiumDriverCard key={3} position={3} year={YEAR} id={3}/>
        </div>
    )
}

export default PodiumCards;