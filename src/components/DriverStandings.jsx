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

    // Want to get the data after the latest round
    useEffect(() => {
        async function getCurrentData() {
            const url = 'https://ergast.com/api/f1/2023/driverStandings.json';
            await axios.get(url).then(response => {
                const {StandingsLists} = response.data.MRData.StandingsTable;
                const {DriverStandings} = StandingsLists[0];
                numCompletedRounds = StandingsLists[0].round;
                numDrivers = StandingsLists[0].DriverStandings.length;

                DriverStandings.forEach(driver => {
                    driverDatasets.push({
                        label : driver.Driver.driverId, // TODO - Capitalise first letter and for drivers with underscores, replace with spaces
                        data : []
                    })
                })
            }).catch(error => console.log(error));

        }

        async function getRaceNames() {
            const url = 'https://ergast.com/api/f1/current.json';
            await axios.get(url).then(response => {
                // Only want to get the names of the COMPLETED rounds (not necessarily all)
                const { Races } = response.data.MRData.RaceTable;
                for (let i = 0; i < numCompletedRounds; i++) {
                    raceNames.push(Races[i].raceName);
                }
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
                    DriverStandings.forEach(driver => {
                        driverDatasets.forEach(dataset => {
                            if (dataset.label.toLowerCase() == driver.Driver.driverId) {
                                dataset.data.push(driver.points);
                            }
                        })
                    })


                }).catch(error => console.log(error));
            }
        }
        
        async function getData() {
            console.log("getData call beginning")
            //await getDriverIds();
            await getCurrentData();
            await getRaceNames();
            await getDriverData();
            setChartData({
                labels: raceNames,
                datasets: driverDatasets
            })
        }
        
        getData();
    }, []);

    // TODO ADD LOADING PAGE!

    return (
        <div>
            <Line 
                data={chartData}
                height={800}
                width={200}
                options={{
                    scales: {
                        x: {
                            ticks: {
                                maxRotation: 90,
                                minRotation: 90
                            }
                        },
                    },
                    maintainAspectRatio: false
                }}
            />
        </div>
    )
}

export default DriverStandings