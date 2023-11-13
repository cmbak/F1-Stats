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

    // https://www.reddit.com/r/formula1/comments/11a3wnj/f1_2023_hex_codes/
    const CONSTRUCTOR_COLOURS_BY_ID = {
        "mercedes": "#6CD3BF",
        "red_bull": "#3671C6",
        "ferrari": "#F91536",
        "mclaren": "#F58020",
        "alpine": "#2293D1",
        "alphatauri": "#5E8FAA",
        "aston_martin": "#358C75",
        "williams": "#37BEDD",
        "alfa": "#C92D4B",
        "haas": "#B6BABD"
    }

    let driverDatasets = []
    let numCompletedRounds;
    let numDrivers;
    let driverIDs = [];
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
                    driverIDs.push(driver.Driver.driverId)
                    //label : `${driver.Driver.givenName} ${driver.Driver.familyName}`,
                    driverDatasets.push({
                        label : driver.Driver.driverId, // TODO - Capitalise first letter and for drivers with underscores, replace with spaces
                        data : [],
                        borderColor : CONSTRUCTOR_COLOURS_BY_ID[driver.Constructors[0].constructorId],
                        backgroundColor: CONSTRUCTOR_COLOURS_BY_ID[driver.Constructors[0].constructorId]
                    })
                })
            }).catch(error => console.log(error));

        }

        // Gets names of completed rounds and adds them to raceNames array
        async function getRaceNames() {
            const url = 'https://ergast.com/api/f1/current.json';
            await axios.get(url).then(response => {
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
        
        // Gets the points each driver had after each round and adds them to the driver's data array
        async function getDriverData() {
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
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Grand Prix',
                                font: {
                                    size: 25,
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                maxRotation: 90,
                                minRotation: 90
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Points',
                                font: {
                                    size: 25,
                                    weight: 'bold'
                                }
                            }
                        }
                    },
                    maintainAspectRatio: false
                }}
            />
        </div>
    )
}

export default DriverStandings