import React, { useEffect, useState, useContext } from "react"
import EmptyState from "../components/partials/dialogs/EmptyState";
import Icon from "../components/partials/icons/Icon";
import Button from "../components/partials/buttons/Button";
import useGoBack from "../hooks/useGoBack";

const NotFoundPage = ({ }) => {

    const { goBack } = useGoBack()

    useEffect(() => {

    }, [])
    return (
        <>

            <section className="w-full min-h-[100vh]">

                <EmptyState className="min-h-[80vh] max-w-[80%] mx-auto my-[10vh] full-bg" noBound={true} style={{ backgroundImage: `url("../../../images/assets/bg@grad_01.webp")` }}>
                    <div className="space-y-[1.5rem] text-center">

                        <div><Icon name="bell-off" type="feather" className="pas-900" size={80} /></div>
                        <div>
                            <span className="font-mona-light pag-800 text-[35px]">We can't find what you're looking for</span>
                        </div>
                        <div>
                            <Button
                                type="primary"
                                semantic="normal"
                                size="md"
                                block={false}
                                className="form-button min-w-[140px]"
                                text={{
                                    label: `Go Back`,
                                    size: 13,
                                    weight: 'semibold'
                                }}
                                icon={{
                                    enable: true,
                                    child: <Icon name="nav-arrow-right" type="polio" size={16} className="color-white" />
                                }}
                                onClick={(e) => goBack()}
                            />
                        </div>

                    </div>
                </EmptyState>

            </section>
        </>
    )
};

export default NotFoundPage;
