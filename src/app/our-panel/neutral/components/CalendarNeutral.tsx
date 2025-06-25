import ScheduleDateNeutral from "@/app/our-panel/neutral/components/ScheduleDateNeutral";
import ButtonMiles from "@/components/ui/custom/ButtonMiles";

export default function CalendarNeutral(){

    return(
        <>
            <div className={'bg-gray-200 rounded-xl p-10 '}>

                <div className={' grid grid-cols-2 '}>
                    <div>
                        <h3>Schedule now</h3>
                        <p>Sarah B. “Sally” Akins was the 60th president of the State Bar of Georgia from June, 2022-2023. </p>
                        <div>
                            <h4>Case Manager</h4>
                            <div>
                                <h5>John Smith</h5>
                                <p>+1 470 893 1175</p>
                                <p>casemanager@email.com</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <form action="">
                                <div>
                                    <div>
                                        <label htmlFor="">
                                            Case venue
                                        </label>
                                        <input type="text" placeholder={'Select a case venue'}/>
                                    </div>
                                    <div>
                                        <label htmlFor="">Dates</label>
                                        <input type="text" placeholder={'MM/DD/YYY'}/>
                                    </div>
                                    <div>
                                        <ScheduleDateNeutral/>
                                        <ScheduleDateNeutral/>
                                        <ScheduleDateNeutral/>
                                        <div className={'mt-5'}>
                                            <ButtonMiles variant={'contained'}/>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}