import React, {Component} from 'react';
import ChartJS from 'chart.js';

class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        const ctx = document.querySelector(`#${this.props.id}`).getContext('2d');
        ChartJS.defaults.global.elements.point.radius = 0;
        ChartJS.defaults.global.elements.line.borderWidth = 1;
        ChartJS.defaults.global.tooltips.mode = 'nearest';
        ChartJS.defaults.global.tooltips.intersect = false;
        const chart = new ChartJS(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Anger',
                    data: this.props.data.anger,
                    showLine: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                },
                {
                    label: 'Contempt',
                    data: this.props.data.contempt,
                    showLine: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                },
                {
                    label: 'Disgust',
                    data: this.props.data.disgust,
                    showLine: true,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                },
                {
                    label: 'Fear',
                    data: this.props.data.fear,
                    showLine: true,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                },
                {
                    label: 'Happiness',
                    data: this.props.data.happiness,
                    showLine: true,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                },
                {
                    label: 'Neutral',
                    data: this.props.data.neutral,
                    showLine: true,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                },
                {
                    label: 'Sadness',
                    data: this.props.data.sadness,
                    showLine: true,
                    backgroundColor: 'rgba(50, 159, 64, 0.2)',
                    borderColor: 'rgba(50, 159, 64, 1)',
                },
                {
                    label: 'Surprise',
                    data: this.props.data.surprise,
                    showLine: true,
                    backgroundColor: 'rgba(50, 50, 64, 0.2)',
                    borderColor: 'rgba(50, 50, 64, 1)',
                }]
            },
            options: {
                // tooltips: {
                //     callbacks: {
                //         label: (tooltipItem, data) => {
                //             return data + '%';
                //         }
                //     }
                // },
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            callback: value => {
                                return value + '%';
                            }
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

    }

    render() {
        return (
            <div className="chart-wrapper">
                <h2>{this.props.id}</h2>
                <canvas id={this.props.id}></canvas>
            </div>
        );
    }
}

export default Chart;