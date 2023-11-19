import React from 'react';

// Passed in position of driver which should be displayed
// Then we get data based on latest round - could this be changed in future so that year can be specified

// Name, driver number (if applicable!)
// Team
// Picture
// Wins
// Podiums
// Poles
// Points

function PodiumDriverCard() {
    return (
        <div className='podium-driver-card'>
            {/*
                For drivers who are currently 1st, 2nd and 3rd in standings
                If champion already, set name etc. of driver to gold? - How can this be calculated?
             */}
            <div className='podium-card-driver-info'>
                <h1>Lewis Hamilton</h1>
                <em>#44</em>
                <h2>Picture</h2>
                <em>Mercedes AMG Petronas Formula One Team</em>
                <p>Points: 232</p>
            </div>
            <table className='podium-card-stats'>
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