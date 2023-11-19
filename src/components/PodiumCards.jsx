import React from 'react';
import PodiumDriverCard from './PodiumDriverCard';

// Is there a way to change styling depending on (in this case) position?
// - E.g. want no 1 to be above the others? How would this work?

function PodiumCards() {
    return (
        <div className='podium-container'>
            <PodiumDriverCard position={2} />
            <PodiumDriverCard position={1}/>
            <PodiumDriverCard position={3}/>
        </div>
    )
}

export default PodiumCards;