'use client'

import ScheduleDateNeutral from "@/app/our-panel/neutral/components/ScheduleDateNeutral";
import ButtonMiles from "@/components/ui/custom/ButtonMiles";
import {DrawerCalendar} from "@/components/ui/custom/DrawerCalendar";
// Updated imports for Azure API
import { AZURE_API_URL, AUTH_TOKEN, URL_DASHBOARD } from "@/lib/globalConstants";
// Legacy Strapi imports (commented for future reference)
// import { URL_BACKOFFICE_DOMAIN, URL_DASHBOARD } from "@/lib/globalConstants";
import useSWR from "swr";

interface calendarType{
    caseManager?:{
        available: boolean;
        email: string
        mobile: string
        name: string
    },
    neutral_id?: string,
}

const fetcherWithToken = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      // Updated to use the new auth token
      Authorization: `Bearer ${AUTH_TOKEN}`
      // Legacy token (commented for future reference)
      // Authorization: `Bearer ${process.env.NEXT_PUBLIC_DASHBOARD_TOKEN}` // o ponlo hardcodeado si es temporal
    }
  });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // @ts-ignore
    error.info = await res.json();
    // @ts-ignore
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function CalendarNeutral({caseManager,neutral_id}: calendarType){




    // Get the data from the Dashboard API
    const FETCH_URL = `${URL_DASHBOARD}/rest/neutrals/calendar/${neutral_id}`;

    // console.log("FETCH_URL CHECK",FETCH_URL)

    const { data, error, isLoading } = useSWR(
        neutral_id ? `${URL_DASHBOARD}/rest/neutrals/calendar/${neutral_id}` : null,
        fetcherWithToken
    );



    // Mannage the data from the Dashboard API
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if(!data) return null;




    // console.log("CHECK CALENDAR DATA: ",data)

    return(
        <>
            <div className={'bg-gray-200 rounded-xl p-10 '}>

                <div className={' grid grid-cols-2 '}>
                    <div className={'flex flex-col justify-between'}>
                        <div>

                            <h3 className={'font-bold main-text-color'}>Schedule now</h3>
                            <p>Sarah B. "Sally" Akins was the 60th president of the State Bar of Georgia from June, 2022-2023. </p>
                        </div>
                        {caseManager &&(
                            <>
                                <div>
                                    <h4 className={'text-3xl font-medium main-text-color mt-10 font-title'}>
                                        Case manager
                                    </h4>
                                    <div className={'flex flex-row gap-4 mt-5'}>
                                        <div className={'text-lg w-60 h-60'}>

                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img className={'w-full h-full'} src={'/neutrals/audrey.png'} alt={''}/>
                                        </div>
                                        <div className={'gap-4'}>
                                            <h5 className={'text-xl font-medium'}>{caseManager.name}</h5>
                                            <p><a className={'text-teal-800'} href={`tel:${caseManager.mobile}`}>{caseManager.mobile}</a></p>
                                            <p><a className={'text-teal-800'} href={`mailto:${caseManager.email}`}>{caseManager.email}</a></p>
                                        </div>
                                    </div>
                                </div>
                            </>
                            )}
                    </div>
                    <div>
                        <div className={'bg-white p-10 rounded-xl '}>
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
                                    <div className={'mt-5'}>
                                        <DrawerCalendar events={data} />
                                        <ScheduleDateNeutral/>
                                        <ScheduleDateNeutral/>
                                        <ScheduleDateNeutral/>
                                        <div className={'mt-5'}>
                                            <ButtonMiles variant={'contained'}>
                                                Continue
                                            </ButtonMiles>
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