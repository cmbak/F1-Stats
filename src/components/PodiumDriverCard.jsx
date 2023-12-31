import React from 'react';
import { useQueries, useQuery } from 'react-query';
import axios from 'axios';

// Podiums
// Poles

function PodiumDriverCard({ position, year }) {
    const WIKI_IMAGE_BASE_URL = "https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles="

    async function retrieveDriverData() {
        const response = await axios.get(`https://ergast.com/api/f1/${year}/driverStandings.json`);
        return response.data;
    }

    // limit 200?
    async function retriveWikiPageName() {
        // To get the image we need to know the name of the driver's wikipedia page - found after the last / of url
        const DRIVER_WIKI_PAGE_NAME = url.substring(url.lastIndexOf('/')+1);
        const DRIVER_WIKI_IMG_URL = WIKI_IMAGE_BASE_URL + DRIVER_WIKI_PAGE_NAME;
        const response = await axios.get(DRIVER_WIKI_IMG_URL);
        return response.data;        
    }

    const { isLoading: isDataLoading, isError: isDataError, data: driverData, error: dataError} = useQuery('driverData', retrieveDriverData);

    const { data: wikiPageNameData, isLoading: isWikiPageLoading, isError: isWikiPageError, error: wikiPageError } = useQuery({
        queryKey: [`wikiPageNamePos${position}`],
        queryFn: retriveWikiPageName,
        // Query will only execute once driverData exists
        enabled: !!driverData,
    });

    const driverImgUrl = wikiPageNameData?.query.pages[0].original.source;

    if (isDataLoading) {
        return <span>Loading...</span>
    }

    if (isDataError) {
        return <span>Error: {dataError.message}</span>
    }

    const DRIVER_DATA = (driverData.MRData.StandingsTable.StandingsLists[0].DriverStandings[position-1]) // OR! Can search through DriverStandings and get object w/ position=position? Which would make more sense?
    const { Driver: { familyName, givenName, permanentNumber, url }, points, wins } = DRIVER_DATA;

    if (isWikiPageLoading) {
        return <span>Loading...</span>
    }

    if (isWikiPageError) {
        return <span>Error: {wikiPageError.message}</span>
    }

    // TODO - Change width of img
    // TODO - Match img sizes from ^
    // TODO - Style Cards

    return (
        <div className='podium-driver-card' key={position}>
            {/*
                For drivers who are currently 1st, 2nd and 3rd in standings
                If champion already, set name etc. of driver to gold? - How can this be calculated?
             */}
            <div className='podium-card-driver-info'>
                <h1>{`${givenName} ${familyName}`}</h1>
                {permanentNumber && <em>#{permanentNumber}</em>}
                <div className='img-cont'>
                    <img className='podium-driver-img' src={driverImgUrl} alt={`Picture of ${givenName} ${familyName}`} />
                </div>
                <h2>{DRIVER_DATA.Constructors[0].name}</h2>
                <p>Points: {points}</p>
            </div>
            <table className='podium-card-stats'>
                <tbody>
                    <tr>
                        <th>Wins</th>
                    </tr>
                    <tr>
                        <td>{wins}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PodiumDriverCard;