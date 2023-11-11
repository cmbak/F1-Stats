import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title} from 'chart.js/auto';

ChartJS.register(LineElement, PointElement, LinearScale, Title);

function DriverStandings() {
    const [currentData, setCurrentData] = React.useState([]);
    let numCompletedRounds;
    let numDrivers;
    let driverIDs;
    let raceNames;

    // For each driver we want to create an object which looks like this: 
    // {
    //        label: driver name
    //        data: array of points
    // }

    // Chart data 
    let data ={
        labels: [raceNames],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
        },
        {
            label: '#dsfds of Votes',
            data: [12, 24, 3, 5, 2, 30],
        }]
    }
    
    // Can we make the followng local vars?
    // xLabels (array str), driverID? (array str)
    // And then points for each driver - some function gets driver id passed into it
    // and gets the results from each round

    // Want to get the data after the latest round
    useEffect(() => {
        async function getCurrentData() {
            const url = 'https://ergast.com/api/f1/2023/driverStandings.json';
            const response = await axios.get(url).then(response => {
                setCurrentData(response.data.MRData);
                const {StandingsLists} = response.data.MRData.StandingsTable;
                numCompletedRounds = StandingsLists[0].round;
                numDrivers = StandingsLists[0].DriverStandings.length;
                //console.log(numCompletedRounds);
            }).catch(error => console.log(error));
        }

        async function getRaceNames() {
            const url = 'https://ergast.com/api/f1/current.json';
            await axios.get(url).then(response => {
                raceNames = response.data.MRData.RaceTable.Races.map(race => race.raceName);
            })
        }

        async function getDriverIds() {
            const url = 'https://ergast.com/api/f1/2023/driverStandings.json';
            await axios.get(url).then(response => {
                const {DriverStandings} = response.data.MRData.StandingsTable.StandingsLists[0];
                driverIDs = DriverStandings.map(driver => driver.Driver.driverId); // In championship standing order
            })
        }
        
        getCurrentData();
        getRaceNames();
        getDriverIds();

    }, []);

    // TODO Get data (points in each round in an array) for each driver:
        //TODO Need to get the number of rounds which have been completed
        // Then loop from i = 1 to i = completed rounds to get data from each round using `https://ergast.com/api/f1/2023/${i}/driverStandings.json`
        
        // IMPORTANT
        // IF THE DRIVER DIDN'T PARTICIPATE IN THAT ROUND, MAKE SURE POINTS SCORED IN THE ROUND IS 0 

        // TODO Convert strings returned from ^ to Integers

        // TODO Find a way of being able to do this for each driver

    

    return (
        <div>
            <Line 
                data={data}
                height={400}
                width={100}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>
    )
}

export default DriverStandings