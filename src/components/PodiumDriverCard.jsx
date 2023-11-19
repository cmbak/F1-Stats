import React from 'react';
import { useState } from 'react'
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

// Passed in position of driver which should be displayed
// Then we get data based on latest round - could this be changed in future so that year can be specified

// Name, driver number (if applicable!)
// Team
// Picture
// Wins
// Podiums
// Poles
// Points

function PodiumDriverCard({ position, year }) {
    // const [driverStats, setDriverStats] = useState([]);
    async function retrieveDriverData() {
        const response = await axios.get(`https://ergast.com/api/f1/${year}/driverStandings.json`);
        return response.data;
    }


    const { isLoading, isError, data, error} = useQuery('driverData', retrieveDriverData);

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    //console.log(data);
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