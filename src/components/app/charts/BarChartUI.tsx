import React, { useEffect, useMemo, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement, // Required for Bar charts
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Define the type for our data points
interface IDataPoint {
    name: string; // Month name
    value: number; // USD value
}

interface IBarChartUI {
    data: Array<IDataPoint>
    height?: number,
    yAxis?: {
        border?: boolean
    },
    bar?: {
        bgColor?: string,
        hoColor?: string,
        active?: string
    }
}

const BarChartUI = (props: IBarChartUI) => {

    const {
        data,
        height = 200,
        bar = {
            bgColor: 'rgba(224,242,254,1)',
            hoColor: 'rgba(19,191,255,1)',
            active: 'apr'
        },
        yAxis = {
            border: true,
        }
    } = props;

    // Create a ref to access the Chart.js instance
    const chartRef = useRef<ChartJS<'bar', number[], string>>(null);

    // find bar to highlight
    const monthIndex = data.findIndex((x) => x.name.toLowerCase() === bar?.active?.toLowerCase())

    // Chart data configuration
    const chartData = useMemo(() => {
        return {
            labels: data.map(d => d.name), // Month names for X-axis
            datasets: [
                {
                    label: 'Monthly Revenue', // Label for the dataset
                    data: data.map(d => d.value), // USD values for bars
                    backgroundColor: bar ? bar.bgColor : 'rgb(59, 130, 246, 1)', // Blue bars
                    borderColor: bar ? bar.bgColor : 'rgb(59, 130, 246, 1)', // Border color for bars
                    borderWidth: 0,
                    borderRadius: 4, // Rounded corners for bars
                    barThickness: 50, // Explicitly set bar width to 50px
                    hoverBackgroundColor: bar ? bar.hoColor : 'rgb(59, 130, 246, 1)', // Blue bars
                },
            ],
        };
    }, [data]);

    // Chart options configuration
    const chartOptions: ChartOptions<'bar'> = useMemo(() => {
        return {
            responsive: true,
            maintainAspectRatio: false, // Important: Allows the chart to take the width of its parent
            plugins: {
                legend: {
                    display: false, // Show legend
                    position: 'top' as const, // Position legend at the top
                    labels: {
                        usePointStyle: true, // Use a square for bar legend
                        padding: 20,
                    },
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: '#d1d5db',
                    borderWidth: 1,
                    titleColor: '#1f2937',
                    bodyColor: '#4b5563',
                    titleFont: {
                        weight: 'bold'
                    },
                    bodyFont: {
                        weight: 'normal'
                    },
                    padding: 10,
                    cornerRadius: 8,
                    callbacks: {
                        label: function (context) {
                            // Format tooltip label to show USD value
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += `USD${(context.parsed.y / 1000).toFixed(0)}k`;
                            }
                            return label;
                        }
                    }
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false, // Hide X-axis grid lines
                    },
                    title: {
                        display: false, // Set to false to remove the 'Month' label
                    },
                    ticks: {
                        color: '#7C7E90',
                        font: {
                            family: 'MonaSans-Light'
                        }
                    },
                },
                y: {
                    beginAtZero: true, // Start Y-axis from zero
                    max: 20000, // Max value for Y-axis
                    grid: {
                        color: '#E4E8F0', // Light gray grid lines
                    },
                    ticks: {
                        // Format Y-axis ticks to show 0k, 5k, etc.
                        callback: function (value: string | number) {
                            return `${(Number(value) / 1000).toFixed(0)}k`;
                        },
                        color: '#7C7E90',
                        stepSize: 5000, // Explicitly set step size to ensure 0k, 5k, 10k, 15k, 20k
                        font: {
                            family: 'MonaSans-Light'
                        }
                    },
                    title: {
                        display: false, // Set to false to remove the 'Revenue' label
                    },
                    border: {
                        display: yAxis?.border
                    }
                },
            },
            // Interaction settings are important for hover effects to work
            interaction: {
                mode: 'index' as const, // 'index' mode activates all items at the same x-position
                intersect: false, // Allows activation even if mouse isn't directly over the bar
            },
        };
    }, []);

    useEffect(() => {
        const chart = chartRef.current;

        if (chart && monthIndex >= 0 && chart.tooltip) {
            // Set active elements for highlighting
            chart.setActiveElements([{ datasetIndex: 0, index: monthIndex }]);
            // Set active elements for tooltip (optional, but good for consistency)
            chart.tooltip.setActiveElements([{ datasetIndex: 0, index: monthIndex }], { x: 0, y: 0 });
            chart.update(); // Update the chart to reflect the changes
        }

    }, [monthIndex]);

    return (
        <div className='h-[100%]' style={{ height: `${height}px` }}>
            <Bar ref={chartRef} data={chartData} options={chartOptions} />
        </div>
    );
};

export default BarChartUI;
