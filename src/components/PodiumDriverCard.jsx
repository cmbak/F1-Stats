import React from 'react';
import { useQueries, useQuery } from 'react-query';
import axios from 'axios';

// driver number (if applicable!)
// Podiums
// Poles

function PodiumDriverCard({ position, year }) {
    const WIKI_IMAGE_BASE_URL = "https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles="


    async function retrieveDriverData() {
        const response = await axios.get(`https://ergast.com/api/f1/${year}/driverStandings.json`);
        return response.data;
    }

    let imgUrl;
    // limit 200?
    async function retriveWikiPageName() {
        // To get the image we need to know the name of the driver's wikipedia page - found after the last / of url
        // console.log(driverData.MRData.StandingsTable.StandingsLists[0].DriverStandings[position-1].Driver.familyName)
        // const url = driverData.MRData.StandingsTable.StandingsLists[0].DriverStandings[position-1].Driver.url;
        const DRIVER_WIKI_PAGE_NAME = url.substring(url.lastIndexOf('/')+1);
        //console.log(`${position} ${DRIVER_WIKI_PAGE_NAME}`)
        const DRIVER_WIKI_IMG_URL = WIKI_IMAGE_BASE_URL + DRIVER_WIKI_PAGE_NAME;
        const response = await axios.get(DRIVER_WIKI_IMG_URL);
        return response.data;        
        // .then(response => {
        //     console.log(response.data.query.pages[0].original.source);
        // }).catch(error => console.log(error));
    }

    // const [driverData, driverImg] = useQueries([
    //     { queryKey: ["driverData"], queryFn: retrieveDriverData },
    //     { queryKey}
    // ])

    const { isLoading: isDataLoading, isError: isDataError, data: driverData, error: dataError} = useQuery('driverData', retrieveDriverData);

    const { data: wikiPageNameData, isLoading: isWikiPageLoading, isError: isWikiPageError, error: wikiPageError } = useQuery({
        queryKey: [`wikiPageNamePos${position}`],
        queryFn: retriveWikiPageName,
        // Query will only execute once DRIVER_DATA exists
        enabled: !!driverData,
    });

    if (isDataLoading) {
        return <span>Loading...</span>
    }

    if (isDataError) {
        return <span>Error: {dataError.message}</span>
    }

    //console.log(data);

    const DRIVER_DATA = (driverData.MRData.StandingsTable.StandingsLists[0].DriverStandings[position-1]) // OR! Can search through DriverStandings and get object w/ position=position? Which would make more sense?
    const { Driver: { familyName, givenName, permanentNumber, url }, points, wins } = DRIVER_DATA;
    //console.log(`${familyName} ${url} ${position}`)

    //console.log(wikiPageNameData)



    
    // if (isWikiPageLoading) {
    //     return <span>Loading...</span>
    // }

    // if (isWikiPageError) {
    //     return <span>Error: {wikiPageError.message}</span>
    // }

    const driverImgUrl = wikiPageNameData?.query.pages[0].original.source;

    //console.log(`${position} ${familyName}`)
    // console.log(`${position} ${driverImgUrl}`);



    //console.log(wikiPageName);

    // TODO - Change getDriverImg to use react-query?
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
                <em>#{permanentNumber}</em>
                <img className='podium-driver-img' src={driverImgUrl} alt={`Picture of ${givenName} ${familyName}`} />
                {/* <em>{DRIVER_DATA.Constructors[0].name}</em>
                <p>Points: {points}</p> */}
            </div>
            <table className='podium-card-stats'>
                <tbody>
                    <tr>
                        <th>Wins</th>
                    </tr>
                    <tr>
                        {/* <td>{wins}</td> */}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PodiumDriverCard;