import React, { useEffect, useMemo, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartOptions,
    TooltipItem,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface IDataPoint {
    name: string;
    uv: number;
    pv: number;
}

interface IChartData {
    labels: Array<string>;
    datasets: Array<{
        fill: boolean;
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: (context: any) => any;
        tension: number;
        pointRadius: number;
        borderWidth: number;
    }>;
}

interface IGrowthGraph {
    height?: number,
    data: Array<IDataPoint>
}

const GrowthGraph = (props: IGrowthGraph) => {

    const {
        height = 320,
        data
    } = props;

    // Define the primary blue color for consistency
    const color = 'rgb(5, 181, 246)'; // Tailwind's blue-500

    // Use useMemo for chartData to create the gradient dynamically
    // The gradient needs access to the chart's canvas context, which is available
    // when Chart.js renders. We pass a function to backgroundColor that Chart.js calls.
    const chartData = useMemo(() => {
        return {
            labels: data.map(d => d.name),
            datasets: [
                {
                    fill: true,
                    label: 'Growth Percentile',
                    data: data.map(d => d.pv),
                    borderColor: color,

                    // Use a function to create the gradient, which Chart.js will call
                    // with the chart's context (ctx)
                    backgroundColor: (context: any) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;

                        if (!chartArea) {
                            // This case happens on initial render or when chartArea is not yet defined
                            return color; // Fallback to solid color
                        }

                        // Create a linear gradient from the top of the chart area to the bottom
                        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

                        // Add color stops:
                        // 0.0 (top): Full blue color
                        // 0.5 (middle): Blue with some transparency
                        // 1.0 (bottom): Fully transparent
                        gradient.addColorStop(0, 'rgba(5, 181, 246, 0.3)'); // Top of the gradient, full blue
                        gradient.addColorStop(0.5, 'rgba(5, 181, 246, 0.1)'); // Mid-point, semi-transparent blue
                        gradient.addColorStop(1, 'rgba(5, 181, 246, 0)'); // Bottom of the gradient, fully transparent

                        return gradient;
                    },

                    tension: 0.4,
                    pointRadius: 2, // not visible dots
                    pointHitRadius: 0, // Add a hit radius to make points detectable on hover
                    borderWidth: 2,
                },
            ],
        };
    }, [data, color]); // Depend on rawData and primaryBlue

    const options: ChartOptions<'line'> = useMemo(() => {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    position: 'bottom' as const,
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                    }
                },
                tooltip: {
                    // Custom styling for the tooltip to match your Recharts example
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
                    // Custom callbacks for tooltip content
                    callbacks: {
                        title: (tooltipItems: TooltipItem<'line'>[]) => {
                            // The title will be the month name (e.g., "Jan")
                            return tooltipItems[0].label || '';
                        },
                        label: (tooltipItem: TooltipItem<'line'>) => {
                            // The label will be "Page Views: [value]"
                            return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
                        }
                    }
                },
            },
            scales: {
                x: {
                    display: false,
                    grid: {
                        display: false,
                    },
                },
                y: {
                    display: false,
                    grid: {
                        display: false,
                    },
                },
            },
            elements: {
                line: {
                    tension: 0.4,
                }
            }
        };
    }, []);

    

    return (
        <div className="w-full bg-color-white" style={{ height: `${height}px` }}>
            <Line height={height} data={chartData} options={options} />
        </div>
    );
};

export default GrowthGraph;
