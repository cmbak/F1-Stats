import React from 'react';
import { useState } from 'react'
import { useQuery } from 'react-query';
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
    //const [driverData, setDriverData] = useState({});
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

    const DRIVER_DATA = (data.MRData.StandingsTable.StandingsLists[0].DriverStandings[position-1]) // OR! Can search through DriverStandings and get object w/ position=position? Which would make more sense?
    const { Driver: { familyName, givenName, permanentNumber }, points, wins } = DRIVER_DATA;
    
    return (
        <div className='podium-driver-card'>
            {/*
                For drivers who are currently 1st, 2nd and 3rd in standings
                If champion already, set name etc. of driver to gold? - How can this be calculated?
             */}
            <div className='podium-card-driver-info'>
                <h1>{`${givenName} ${familyName}`}</h1>
                <em>#{permanentNumber}</em>
                <h2>Picture</h2>
                <em>{DRIVER_DATA.Constructors[0].name}</em>
                <p>Points: {points}</p>
            </div>
            <table className='podium-card-stats'>
                <tbody>
                    <tr>
                        <th>Wins</th>
                    </tr>
                    <tr>
                        <th>{wins}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PodiumDriverCard;