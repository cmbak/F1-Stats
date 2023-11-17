import React from 'react';

function DriverComparisonCard() {
    return (
        <div className='driver-card'>
            {/*
             Plan in figma?
                - Should it be 2 separate cards with their own details (and with pie chart?)
                OR
                - Should it be one thing w/ the data (i.e one pie chart comparing points in the season)
                - With both drivers details
                - And then overall comparison at the bottom (New component?)
             E.g. 
             */}
            <h1>Lewis Hamilton</h1>
            <em>#44</em>
            <h2>Picture</h2>
            <em>Mercedes AMG Petronas Formula One Team</em>
            <p>Championships</p>
            <p>Wins</p>
            <p>Poles</p>
            <p>Podiums</p>
        </div>
    )
}

export default DriverComparisonCard;