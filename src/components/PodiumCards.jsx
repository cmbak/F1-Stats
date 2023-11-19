import React from 'react';
import PodiumDriverCard from './PodiumDriverCard';

// Is there a way to change styling depending on (in this case) position?
// - E.g. want no 1 to be above the others? How would this work?

const YEAR = 2023;

function PodiumCards() {
    return (
        <div className='podium-container'>
            <PodiumDriverCard position={2} year={YEAR} />
            <PodiumDriverCard position={1} year={YEAR}/>
            <PodiumDriverCard position={3} year={YEAR}/>
        </div>
    )
}

export default PodiumCards;