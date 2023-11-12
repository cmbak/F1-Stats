import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title} from 'chart.js/auto';

ChartJS.register(LineElement, PointElement, LinearScale, Title);

function DriverStandings() {
    const [chartData, setChartData] = React.useState({
        labels: [],
        datasets : []
    });
    let driverDatasets = []
    let numCompletedRounds;
    let numDrivers;
    let driverIDs;
    let raceNames = [];

    // For each driver we want to create an object which looks like this: 
    // {
    //        label: driver name
    //        data: array of points
    // }

    // let data = {
    //     labels : ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
    //     datasets: [
    //         {
    //             data: [65, 59, 80, 81, 56, 55, 40]
    //         },
    //         {
    //             data: [65, 59, 80, 81, 56, 55, 40],
    //         }
    //     ]
    // }

    // console.log(data);
    
    // Can we make the followng local vars?
    // xLabels (array str), driverID? (array str)
    // And then points for each driver - some function gets driver id passed into it
    // and gets the results from each round

    // Want to get the data after the latest round
    useEffect(() => {
        async function getCurrentData() {
            const url = 'https://ergast.com/api/f1/2023/driverStandings.json';
            await axios.get(url).then(response => {
                //setCurrentData(response.data.MRData);
                const {StandingsLists} = response.data.MRData.StandingsTable;
                const {DriverStandings} = StandingsLists[0];
                numCompletedRounds = StandingsLists[0].round;
                numDrivers = StandingsLists[0].DriverStandings.length;

                DriverStandings.forEach(driver => {
                    driverDatasets.push({
                    //data.datasets.push({
                        label : driver.Driver.driverId,
                        data : []
                    }) // is a comma needed?
                })
            }).catch(error => console.log(error));

            //console.log(driverDatasets);
        }

        async function getRaceNames() {
            const url = 'https://ergast.com/api/f1/current.json';
            await axios.get(url).then(response => {
                // Only want to get the names of the COMPLETED rounds (not necessarily all)
                const { Races } = response.data.MRData.RaceTable;
                for (let i = 0; i < numCompletedRounds; i++) {
                    //data.labels.push(Races[i].raceName)
                    raceNames.push(Races[i].raceName);
                }

                //data.labels = response.data.MRData.RaceTable.Races.map(race => race.raceName);
            }).catch(error => console.log(error));
        }

        // TODO This could be merged w/ getCurrentData (same url)
        // async function getDriverIds() {
        //     const url = 'https://ergast.com/api/f1/2023/driverStandings.json'; // TODO - try and find a way to make this applicable for any year (current vs explicit year)
        //     await axios.get(url).then(response => {
        //         const {DriverStandings} = response.data.MRData.StandingsTable.StandingsLists[0];
        //         driverIDs = DriverStandings.map(driver => driver.Driver.driverId); // In championship standing order
        //     }).catch(error => console.log(error));
        // }
        
        async function getDriverData() {
            //console.log(numCompletedRounds);
            for (let i = 1; i <= numCompletedRounds; i++) {
                const url = `https://ergast.com/api/f1/2023/${i}/driverStandings.json`;
                await axios.get(url).then(response => {
                    const {DriverStandings} = response.data.MRData.StandingsTable.StandingsLists[0];
                    // data.datasets.forEach(dataset => {
                    //     DriverStandings.forEach(driver => {
                    //         if (driver.Driver.driverId == dataset.label) {
                    //             dataset.data.push(driver.points);
                    //         }
                    //     })
                    // })

                    DriverStandings.forEach(driver => {
                        driverDatasets.forEach(dataset => {
                        //data.datasets.forEach(dataset => {
                            if (dataset.label == driver.Driver.driverId) {
                                dataset.data.push(driver.points);
                            }
                        })
                    })


                }).catch(error => console.log(error));
            }
        }
        
        async function getData() {
            
            //await getDriverIds();
            await getCurrentData();
            await getRaceNames();
            await getDriverData(); 
            //data.datasets = driverDatasets;
            //console.log(raceNames)
            //console.log(driverDatasets)
            setChartData({
                labels: raceNames,
                datasets: driverDatasets
            })
            //console.log(chartData)
        }
        
        getData();

        

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
                data={chartData}
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