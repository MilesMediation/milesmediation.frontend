interface CallToActionProps {
    backgroundImage?: string
    title?: string
    description?: string

}


export default function PageHeader({
                                       backgroundImage = "/cardImgSample1.png",
                                       title = 'Our Panel',
                                       description,
                                   }: CallToActionProps) {


    return (
        <>
            <section
                className="w-full h-[75vh] py-10 flex flex-col justify-end items-start bg-cover bg-center
                relative mb-0"
                style={{backgroundImage: `url(${backgroundImage})`}}
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