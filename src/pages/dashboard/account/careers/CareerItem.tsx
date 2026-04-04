import React, { useEffect, useState, useContext } from "react"
import useUser from "../../../../hooks/app/useUser";
import CardUI from "../../../../components/partials/ui/CardUI";
import Divider from "../../../../components/partials/Divider";
import Badge from "../../../../components/partials/badges/Badge";
import IconButton from "../../../../components/partials/buttons/IconButton";
import { Tooltip } from "react-tooltip";
import Career from "../../../../models/Career.model";
import helper from "../../../../utils/helper.util";
import useRandom from "../../../../hooks/useRandom";
import CardLoading from "../../../../components/app/loaders/CardLoading";

interface ICareerItem {
    loading?: boolean,
    career?: Career
}

const CareerItem = ({ loading = false, career }: ICareerItem) => {

    const { randomize } = useRandom()
    const { talent, loading: userLoading } = useUser()

    const [num, setNum] = useState<number>(0);
    const [rubrics, setRubrics] = useState({
        name: '--',
        ID: '--',
        level: '--',
        currentLevel: '--',
        assessments: 0,
        tasks: 0,
        projects: 0,
        points: 0
    });

    useEffect(() => {
        setNum(randomize(5))
    }, [])

    useEffect(() => {
        if (!userLoading) {
            initRubrics()
        }
    }, [userLoading])

    const initRubrics = () => {

        if (career && talent.careers.length > 0) {

            const talCar = talent.careers.find((x) => x.career._id === career._id);

            if (talCar && talCar.fields.length > 0) {
                const fl = talCar.fields.map((x) => x.name);
                setRubrics({
                    ...rubrics,
                    name: fl.join(', '),
                    ID: talCar.fields[0].code,
                    level: talCar.level,
                    currentLevel: talCar.currentLevel,
                    assessments: talCar.assessments,
                    tasks: talCar.tasks,
                    projects: talCar.projects,
                    points: talCar.points
                })
            }

        }

    }

    return (
        <>

            <CardUI>

                {
                    (loading || userLoading) &&
                    <>
                        <CardLoading type="career" size={1} />
                    </>
                }

                {
                    !loading && !userLoading && career &&
                    <>
                        <div className="flex items-center min-h-[70px] relative">

                            <div className="w-auto absolute ml-auto top-0 right-[0rem] flex items-center gap-x-[1rem]">

                                <IconButton
                                    size="min-w-[2rem] min-h-[2rem]"
                                    className="bg-pag-50 pas-700 "
                                    icon={{
                                        type: 'feather',
                                        name: 'eye',
                                        size: 14,
                                    }}
                                    onClick={(e) => { }}
                                />

                                <IconButton
                                    size="min-w-[2rem] min-h-[2rem]"
                                    className="bg-pag-50 par-600 "
                                    icon={{
                                        type: 'feather',
                                        name: 'trash',
                                        size: 14,
                                    }}
                                    onClick={(e) => { }}
                                />

                            </div>

                            <div className="grow flex items-center gap-x-[1.2rem]">

                                <div className="min-w-[26%] min-h-[70px] rounded-[8px] full-bg" style={{ backgroundImage: `url("../../../images/assets/bg@core_0${num ? num : '1'}.webp")` }}>
                                </div>

                                <div className="space-y-[0.35rem]">
                                    <h3 className="font-mona-medium pas-950 text-[14px]">{helper.capitalizeWord(career.name)}</h3>
                                    <h3 className="font-mona-light pag-500 text-[13px]">Career ID: {career.code}</h3>
                                </div>

                            </div>

                            <div className="h-[40px] w-[1px] mx-[4%] bg-pag-200"></div>

                            <div className="grow flex items-center gap-x-[1.2rem]">

                                <div className="space-y-[0.35rem]">
                                    <h3 className="font-mona-medium pas-950 text-[14px]">{rubrics.name}</h3>
                                    <h3 className="font-mona-light pag-500 text-[13px]">ID: {rubrics.ID}</h3>
                                </div>

                            </div>

                        </div>

                        <div className="py-[0.3rem]">
                            <Divider />
                        </div>

                        <div className="flex items-center min-h-[70px]">

                            <div className="grow space-y-[0.3rem]">

                                <div className="flex items-center gap-x-[0.5rem]">
                                    <Tooltip className='font-mona fs-13' id="tip1-level" place="top" variant="dark" />
                                    <h3 className="font-mona pag-800 text-[13px]">Skill Level</h3>
                                    <span
                                        data-tooltip-id="tip1-level"
                                        data-tooltip-html="Your skill level when<br />you joined pacitude"
                                    >
                                        <IconButton
                                            size="min-w-[1.2rem] min-h-[1.2rem]"
                                            className="ml-auto bg-pacb-500 bgh-pacb-500 relative top-[-2px]"
                                            active={true}
                                            icon={{
                                                type: 'polio',
                                                name: 'cancel',
                                                child: <span className="font-mona-medium text-[12px] color-white">?</span>
                                            }}
                                            onClick={(e) => { }}
                                        />
                                    </span>
                                </div>

                                <Badge
                                    type={'info'}
                                    size="sm"
                                    display="badge"
                                    label={rubrics.level}
                                    padding={{ y: 3, x: 12 }}
                                    font={{
                                        weight: 'regular',
                                        size: 10
                                    }}
                                    upper={true}
                                    close={false}
                                />

                            </div>

                            <div className="h-[40px] w-[1px] mx-[3%] bg-pag-200"></div>

                            <div className="grow space-y-[0.3rem]">

                                <div className="flex items-center gap-x-[0.5rem]">
                                    <Tooltip className='font-mona fs-13' id="tip2-level" place="top" variant="dark" />
                                    <h3 className="font-mona pag-800 text-[13px]">Current Skill Level</h3>
                                    <span
                                        data-tooltip-id="tip2-level"
                                        data-tooltip-html={`Your current skill level<br />as determined by Pacitude`}
                                    >
                                        <IconButton
                                            size="min-w-[1.2rem] min-h-[1.2rem]"
                                            className="ml-auto bg-pacb-500 bgh-pacb-500 relative top-[-2px]"
                                            active={true}
                                            icon={{
                                                type: 'polio',
                                                name: 'cancel',
                                                child: <span className="font-mona-medium text-[12px] color-white">?</span>
                                            }}
                                            onClick={(e) => { }}
                                        />
                                    </span>
                                </div>

                                <Badge
                                    type={'ongoing'}
                                    size="sm"
                                    display="badge"
                                    label={rubrics.currentLevel}
                                    padding={{ y: 3, x: 12 }}
                                    font={{
                                        weight: 'regular',
                                        size: 10
                                    }}
                                    upper={true}
                                    close={false}
                                />

                            </div>

                            <div className="h-[40px] w-[1px] mx-[3%] bg-pag-200"></div>

                            <div className="grow space-y-[0.3rem]">

                                <h3 className="font-mona-medium pag-800 text-[13px]">Assessments Taken</h3>

                                <div className="">
                                    <span className="font-mona pag-600 text-[13px]">{helper.leadingZero(rubrics.assessments)} Assessments</span>
                                </div>

                            </div>

                            <div className="h-[40px] w-[1px] mx-[3%] bg-color-white"></div>

                            <div className="grow space-y-[0.3rem]">

                                <h3 className="font-mona-medium pag-800 text-[13px]">Tasks Completed</h3>

                                <div className="">
                                    <span className="font-mona pag-600 text-[13px]">{helper.leadingZero(rubrics.tasks)} Tasks</span>
                                </div>

                            </div>

                            <div className="h-[40px] w-[1px] mx-[3%] bg-color-white"></div>

                            <div className="grow space-y-[0.3rem]">

                                <h3 className="font-mona-medium pag-800 text-[13px]">Career Points</h3>

                                <div className="">
                                    <Badge
                                        type={'default'}
                                        size="sm"
                                        display="badge"
                                        label={`${rubrics.points} Points`}
                                        font={{
                                            weight: 'regular',
                                            size: 10
                                        }}
                                        upper={true}
                                        close={false}
                                    />
                                </div>

                            </div>

                        </div>
                    </>
                }


            </CardUI>
        </>
    )
};

export default CareerItem;
