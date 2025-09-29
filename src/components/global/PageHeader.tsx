import {URL_BACKOFFICE_DOMAIN} from "@/lib/globalConstants";
import classNames from "classnames";

interface CallToActionProps {
    backgroundImage?: string
    title?: string
    description?: string
    classname?: string | null

}


export default function PageHeader({
                                       backgroundImage = "",
                                       title = '',
                                       description,
                                       classname
                                   }: CallToActionProps) {


    const bg_image_processed = backgroundImage ? `${URL_BACKOFFICE_DOMAIN}${backgroundImage}` : '/cardImgSample1.png'
    return (
        <>
            <section
                className={`w-full flex flex-col justify-end items-start py-10 mb-0 relative bg-cover bg-center ${classname ? classname : 'h-[75vh]'}`}
                style={{backgroundImage: `url(${bg_image_processed})`}}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-[var(--Dark-Green_1,#003135)]/80 z-0"/>

                {/* Content */}
                <div className="container mx-auto">

                    <div
                        className=" relative z-10 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className={''}>
                            <h1 className="font-title page-header text-3xl md:text-4xl text-white uppercase mb-4">{title}</h1>
                            <p className="font-body text-white text-base md:text-lg ">{description}</p>
                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}