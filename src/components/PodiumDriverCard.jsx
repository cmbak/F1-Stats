import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

// driver number (if applicable!)
// Podiums
// Poles

function PodiumDriverCard({ position, year }) {
    async function retrieveDriverData() {
        const response = await axios.get(`https://ergast.com/api/f1/${year}/driverStandings.json`);
        return response.data;
    }

    const { isLoading, isError, data, error} = useQuery('driverData', retrieveDriverData);
    const WIKI_IMAGE_BASE_URL = "https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles="

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    const DRIVER_DATA = (data.MRData.StandingsTable.StandingsLists[0].DriverStandings[position-1]) // OR! Can search through DriverStandings and get object w/ position=position? Which would make more sense?
    const { Driver: { familyName, givenName, permanentNumber, url }, points, wins } = DRIVER_DATA;

    // To get the image we need to know the name of the driver's wikipedia page - found after the last / of url ^
    const DRIVER_WIKI_PAGE_NAME = url.substring(url.lastIndexOf('/')+1);
    const DRIVER_WIKI_IMG_URL = WIKI_IMAGE_BASE_URL + DRIVER_WIKI_PAGE_NAME;

    let imgUrl;
    // limit 200?
    async function getDriverImg() {
        const response = await axios.get(DRIVER_WIKI_IMG_URL).then(response => {
            console.log(response.data.query.pages[0].original.source);
        }).catch(error => console.log(error));
    }

    //getDriverImg()

    // TODO - Change getDriverImg to use react-query?
    // TODO - Change width of img
    // TODO - Match img sizes from ^
    // TODO - Style Cards

    return (
        <div className='podium-driver-card'>
            {/*
                For drivers who are currently 1st, 2nd and 3rd in standings
                If champion already, set name etc. of driver to gold? - How can this be calculated?
             */}
            <div className='podium-card-driver-info'>
                <h1>{`${givenName} ${familyName}`}</h1>
                <em>#{permanentNumber}</em>
                <img className='podium-driver-img' src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Lewis_Hamilton_2022_S%C3%A3o_Paulo_Grand_Prix_%2852498120773%29_%28cropped%29.jpg" alt={`Picture of ${givenName} ${familyName}`} />
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