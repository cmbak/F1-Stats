import React from 'react';

function PodiumDriverCard() {
    return (
        <div className='podium-driver-card'>
            {/*
                For drivers who are currently 1st, 2nd and 3rd in standings
                If champion already, set name etc. of driver to gold? - How can this be calculated?
             */}
            <h1>Lewis Hamilton</h1>
            <em>#44</em>
            <h2>Picture</h2>
            <em>Mercedes AMG Petronas Formula One Team</em>
            <table>
                <tbody>
                    <tr>
                        <th>Wins</th>
                        <th>Podiums</th>
                        <th>Poles</th>
                    </tr>
                    <tr>
                        <th>0</th>
                        <th>6</th>
                        <th>1</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PodiumDriverCard;