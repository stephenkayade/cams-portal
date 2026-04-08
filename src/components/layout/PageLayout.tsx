import { IPageLayout } from "../../utils/interfaces.util";
import Toast from "../partials/alerts/Toast";
import useToast from "../../hooks/useToast";

const PageLayout = ({ component, navbar }: IPageLayout) => {

    const { toast, clearToast } = useToast()

    return (
        <>


            <main className={'w-full min-h-[100vh]'}>

                <Toast
                    show={toast.show}
                    message={toast.message}
                    type={toast.type}
                    title={toast.title}
                    position={toast.position}
                    close={(e) => {
                        clearToast()
                    }}
                />

                {component}

            </main>

        </>
    )

};

export default PageLayout;
