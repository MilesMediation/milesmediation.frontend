
interface simpleCardTypes {
    title: string
    description: string
    icon?: string
}


export default function SimpleCard({title= 'Default title', description, icon='/globe.svg'} : simpleCardTypes) {

    return(
        <>
            <div className={'p-5 border border-gray-300 h-80 flex flex-col justify-center rounded-lg transition duration-200 hover:shadow-lg'}>
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className="w-16 h-16 mx-auto"
                        src={`${icon ? icon : '/globe.svg'}`} alt="globe"/>
                </div>
                <div className={'text-center mt-5'}>
                    <p className={'text-2xl font-medium font-title main-text-color pb-4'}>
                        {title}
                    </p>
                    {description &&(
                    <p className={'text-sm'}>
                        {description}
                    </p>
                    )}
                </div>
            </div>
        </>
    )
}