/*import {Button} from "@material-tailwind/react";*/

import React from "react";

interface NeutralProps {
    variant?: 'contained' | 'outlined'
    children: React.ReactNode
}

export default function ButtonMiles({ variant = 'contained', children ='See more'}: NeutralProps){

    return(
        <>
            <button
                className={
                ` font-semibold font-body text-[16px] rounded-[8px] px-6 py-[10px] 
                ${ variant == 'contained' && 'text-white bg-[var(--Dark-Green_1,#003135)]'}
                ${ variant == 'outlined' && 'text-[#003135] bg-white border border-[#003135]'}
                hover:opacity-90 transition
                `}>
                {children}
            </button>
            {/*<Button variant={`${variant}`}>filled</Button>*/}
        </>
    )
}