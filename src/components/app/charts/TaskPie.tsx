import React, { useEffect, useState, useContext } from "react"
import { Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import Question from "../../../models/Question.model";
import { QuestionType } from "../../../utils/types.util";
import Divider from "../../partials/Divider";
import helper from "../../../utils/helper.util";
import useAssessment from "../../../hooks/app/useAssessment";

interface ITaskPie {
    filter?: 'type' | 'overview'
}

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskPie = ({ filter = 'overview' }: ITaskPie) => {

    const { assessment } = useAssessment()

    const chartOptions: ChartOptions<'doughnut'> = {
        plugins: {
            legend: {
                display: false, // We'll create a custom legend
            },
            tooltip: {
                callbacks: {
                    label: (ctx) => {
                        const percentage = ((ctx.parsed / assessment.questions.length) * 100).toFixed(2);
                        return `${percentage}%`;
                    },
                },
            },
        },
    };

    const [labels, setLabels] = useState<Array<QuestionType>>([])
    const [overview, setOverview] = useState<Array<{ label: string, total: number }>>([])
    const [chartValues, setChartValues] = useState<Array<any>>([])
    const [colors, setColors] = useState<Array<string>>([])
    const [chartData, setChartData] = useState<ChartData<'doughnut'>>({
        labels: labels,
        datasets: [
            {
                label: 'Questions',
                data: [],
                backgroundColor: [],
                borderWidth: 5,
            },
        ],
    })


    useEffect(() => {

        initPie()

    }, [filter])

    const initPie = () => {

        let currentOv: typeof overview = [];
        let labels: Array<string> = [], colors: Array<string> = [];

        if (filter === 'overview') {

            labels = ['answered', 'correct', 'unanswered'];
            currentOv = [
                { label: 'Figma File', total: 50 },
                { label: 'Figma Link', total: 30 },
                { label: 'Essay', total: 20 }
            ]

            if (assessment.choices && assessment.choices.length > 0) {

                // Generate different colors for each label
                colors = labels.map((_, index) => {
                    const bgColors = ['#5052D2', '#C94BC1', '#4FD1E0']
                    return bgColors[index % bgColors.length];
                })

                const questions: Array<Question> = assessment.questions;
                const choices = assessment.choices;

                for (let i = 0; i < questions.length; i++) {

                    let question = questions[i];
                    let choice = choices.find((x) => x.question.code === question.code);

                    if (choice) {
                        currentOv[0].total += 1;

                        let correct = question.answers.find((x) => {
                            if (x.isCorrect && x.code === choice.answer) {
                                return x;
                            } else {
                                return null
                            }
                        })

                        currentOv[1].total = correct ? (currentOv[1].total + 1) : currentOv[1].total;

                    } else {
                        currentOv[2].total += 1;
                    }

                }

                setLabels(labels as Array<QuestionType>)
                setOverview(currentOv)
                setColors(colors)

                setChartData({
                    ...chartData,
                    labels: labels,
                    datasets: [{
                        label: 'Questions',
                        data: currentOv.map((x) => { return x.total === 0 ? 1 : x.total }),
                        backgroundColor: colors,
                        borderWidth: 5
                    }]
                })

            } else {

                // Generate different colors for each label
                colors = labels.map((_, index) => {
                    const bgColors = ['#5052D2', '#C94BC1', '#4FD1E0']
                    return bgColors[index % bgColors.length];
                });

                setLabels(labels as Array<QuestionType>)
                setOverview(currentOv)
                setColors(colors)

                setChartData({
                    ...chartData,
                    labels: labels,
                    datasets: [{
                        label: 'Questions',
                        data: currentOv.map((x) => 1),
                        backgroundColor: colors,
                        borderWidth: 5
                    }]
                })

            }



        }

        if (filter === 'type') {

            if (assessment.questions && assessment.questions.length > 0) {
                const tl = assessment.questions.map((x) => x.types).flat(); // map and flatten
                const us = new Set(tl); // create a unique set

                labels = Array.from(us) // get labels

                // process labels
                labels.forEach((x) => {

                    let ov = currentOv.find((m) => m.label === x);
                    let ovi = currentOv.findIndex((m) => m.label === x);
                    let fd = assessment.questions.filter((z) => z.types.includes(x));

                    if (ov) {
                        ov.total = fd.length;
                        currentOv.splice(ovi, 1, ov)
                    } else {
                        currentOv.push({ label: x, total: fd.length })
                    }

                })

                // Generate different colors for each label
                const colors = labels.map((_, index) => {
                    const bgColors = ['#5052D2', '#C94BC1', '#4FD1E0']
                    return bgColors[index % bgColors.length];
                });

                setLabels(labels as Array<QuestionType>)
                setOverview(currentOv)
                setColors(colors)

                setChartData({
                    ...chartData,
                    labels: labels,
                    datasets: [{
                        label: 'Questions',
                        data: currentOv.map((x) => x.total),
                        backgroundColor: colors,
                        borderWidth: 5
                    }]
                })
            }

        }

    }

    return (
        <>
            <div className='grid gap-x-[1rem] grid-cols-2'>

                <div className='w-auto'>
                    <div className='relative' style={{ width: 200, height: 210 }}>
                        <Doughnut data={chartData} options={chartOptions} />
                    </div>
                </div>

                <div className='w-auto'>
                    <div className='h-full flex justify-center flex-col'>

                        <ul className="list-none p-0">
                            {overview.map((item, index) => (
                                <div className="flex justify-between w-7/12">
                                    <li key={item.label} className="flex items-center mb-[0.45rem] gap-x-[0.6rem] w-[9/12]">
                                        <span
                                            className="inline-block w-[9px] h-[9px] rounded-2px"
                                            style={{ backgroundColor: colors[index] }}
                                        ></span>
                                        <span className='font-rethink text-[13px] pag-800'>{helper.capitalizeWord(item.label)}</span>
                                    </li>
                                    <span className='font-rethink text-[13px] pag-800 text-left'>{item.total}%</span>
                                </div>
                            ))}
                        </ul>

                    </div>
                </div>

            </div>
        </>
    )
};

export default TaskPie;
