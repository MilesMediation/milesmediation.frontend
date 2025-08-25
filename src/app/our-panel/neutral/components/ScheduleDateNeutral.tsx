import ButtonMiles from "@/components/ui/custom/ButtonMiles";

export default function ScheduleDateNeutral(){

    return(
        <>
            <div className={'not-last:border-b border-gray-300 py-5 flex flex-row justify-between items-center'}>
                <div>
                    <p>In person</p>
                    <p className={'font-bol'}>Tue, Nov 21</p>
                    <p>Starting at 09:00 (EST)</p>
                </div>
                <div>
                    <ButtonMiles variant={'outlined'} >
                        Book now
                    </ButtonMiles>

                </div>
            </div>
        </>
    )
}