import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title} from 'chart.js/auto';

ChartJS.register(LineElement, PointElement, LinearScale, Title);

function ExampleLineGraph() {
    return <div>
        {/* <Line 
            data={{
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                }]
            }}
            height={400}
            width={100}
            options={{
                maintainAspectRatio: false
            }}
        /> */}
    </div>
}

export default ExampleLineGraph;