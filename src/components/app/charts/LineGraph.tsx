import React, { useEffect, useState, useContext } from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area, // Import Area component
} from 'recharts';

// Define the type for our data points
interface DataPoint {
    name: string;
    uv: number; // Retaining uv in data structure for flexibility, though not rendered
    pv: number;
}

// Sample data for the line graph
const data: DataPoint[] = [
    {
        name: 'Jan',
        uv: 4000, // User Visits
        pv: 2400, // Page Views
    },
    {
        name: 'Feb',
        uv: 3000,
        pv: 1398,
    },
    {
        name: 'Mar',
        uv: 2000,
        pv: 9800,
    },
    {
        name: 'Apr',
        uv: 2780,
        pv: 3908,
    },
    {
        name: 'May',
        uv: 1890,
        pv: 4800,
    },
    {
        name: 'Jun',
        uv: 2390,
        pv: 3800,
    },
    {
        name: 'Jul',
        uv: 3490,
        pv: 4300,
    },
];

const LineGraph = ({ }) => {
    useEffect(() => {

    }, [])
    return (
        <>
            <div className="w-full max-w-4xl h-80 bg-white rounded-lg shadow-xl p-6">
                {/* ResponsiveContainer ensures the chart scales with its parent */}
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        {/* X-Axis: Displays the 'name' (months) and is now hidden */}
                        <XAxis dataKey="name" hide={true} />
                        
                        {/* Y-Axis: Displays numerical values for uv and pv and is now hidden */}
                        <YAxis hide={true} />

                        {/* Shaded Area for 'pv' */}
                        <Area
                            type="monotone"
                            dataKey="pv"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                            fillOpacity={0.6} // Increased opacity
                        />

                        {/* Tooltip: Shows data on hover */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                padding: '10px'
                            }}
                            labelStyle={{
                                color: '#1f2937',
                                fontWeight: 'bold'
                            }}
                            itemStyle={{
                                color: '#4b5563'
                            }}
                        />
                        {/* Legend: Identifies the lines */}
                        <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                        {/* Retaining only the green line ('pv') */}
                        <Line
                            type="monotone"
                            dataKey="pv"
                            name="Page Views"
                            stroke="#82ca9d"
                            dot={false} // Explicitly setting dot to false to remove all dots
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
};

export default LineGraph;
