import React, { useEffect, useMemo, useState } from "react"
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement, // Required for Doughnut and Pie charts
    Tooltip,
    Legend,
    ChartOptions,
    Plugin, // Import Plugin type
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define props for the DoughnutProgressChart component
interface IPieProgress {
    percentage: number;
    size?: number;
    thickness?: number,
    label?: {
        enable: boolean,
        text?: string
    };
    color?: {
        progBg: string,
        pieBg: string,
        percent?: string
    },
    className?: string
}

const PieProgress = (props: IPieProgress) => {

    const {
        percentage,
        className = '',
        size = 60,
        thickness = 80,
        label = {
            enable: false,
            text: ''
        },
        color = {
            progBg: 'rgba(150,22,223,1)',
            pieBg: 'rgba(239,240,245,1)',
            percent: 'rgb(31, 41, 55)'
        }
    } = props;

    // Ensure percentage is clamped between 0 and 100
    const clamp = Math.max(0, Math.min(100, percentage))
    const clampPercent = clamp;
    const remPercent = (100 - clamp);


    // Data for the doughnut chart
    const doughData = useMemo(() => {
        return {
            labels: ['Progress', 'Remaining'],
            datasets: [
                {
                    data: [clampPercent, remPercent],
                    backgroundColor: [
                        color.progBg, // progress bg first
                        color.pieBg, // pie bg
                    ],
                    borderColor: [
                        color.progBg, // progress bg first
                        color.pieBg, // pie bg
                    ],
                    borderWidth: 1,
                    // Removed hoverOffset: 4 to disable hover effect
                },
            ],
        };
    }, [clampPercent, remPercent, clamp]);

    // Chart options
    const chartOptions: ChartOptions<'doughnut'> = useMemo(() => {
        return {
            responsive: true,
            maintainAspectRatio: false, // Allows the parent div to control size
            cutout: `${thickness}%`, // Makes it a doughnut chart, 80% of the radius is cut out
            plugins: {
                legend: {
                    display: false, // Hide the legend
                },
                tooltip: {
                    enabled: false, // Disable default tooltip for a cleaner progress bar look
                },
            },
            // Disable animations for a static progress display unless desired
            animation: {
                animateRotate: true,
                animateScale: true,
            },
            // Disable all interactions including hover
            events: [], // Set events to an empty array to disable all interaction events
        };
    }, []);

    // Custom plugin to draw text in the center of the doughnut chart
    // Re-create plugin if percentage or label changes
    const textPlugin: Plugin<'doughnut'> = useMemo(() => ({
        id: 'centerText',
        beforeDraw(chart) {
            const { width, height, ctx } = chart;
            ctx.restore(); // Save the current canvas state

            const fontSize = (height / 114).toFixed(2); // Dynamic font size
            ctx.font = `500 ${fontSize}em sans-serif`;
            ctx.textBaseline = 'middle';

            const text = `${clampPercent}%`; // The percentage text
            const textX = (width - ctx.measureText(text).width) / 2;
            const textY = height / 2;

            ctx.fillStyle = color && color.percent ? color.percent : 'rgb(31, 41, 55)'; // Dark gray color for the percentage text (Tailwind gray-800)
            ctx.fillText(text, textX, textY); // Draw the percentage

            // If a label is provided, draw it below the percentage
            if (label.enable) {
                const labelFontSize = (height / 180).toFixed(2); // Smaller font size for the label
                ctx.font = `${labelFontSize}em sans-serif`;
                ctx.fillStyle = 'rgb(107, 114, 128)'; // Medium gray for the label (Tailwind gray-500)
                const labelTextX = (width - ctx.measureText(label?.text || '').width) / 2;
                const labelTextY = height / 2 + (height / 10); // Position below percentage

                ctx.fillText(label?.text || '', labelTextX, labelTextY);
            }

            ctx.save(); // Restore the canvas state
        },
    }), [clampPercent, label]);

    return (
        <>
            <div
                className={`flex items-center justify-center bg-color-white ${className}`}
                style={{ width: size, height: size }} // Set fixed size for the container
            >
                <Doughnut
                    data={doughData}
                    options={chartOptions}
                    plugins={label.enable ? [textPlugin] : []} // Apply the custom plugin
                />
            </div>
        </>
    )

};

export default PieProgress;
