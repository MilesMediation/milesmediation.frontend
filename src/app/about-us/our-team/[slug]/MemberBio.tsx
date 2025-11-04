'use client';

import { useState } from 'react';
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { BioContent } from "@/types/api";

interface MemberBioProps {
    bio?: BioContent[];
}

export default function MemberBio({ bio }: MemberBioProps) {
    const [textExpanded, setTextExpanded] = useState(false);

    return (
        <>
            <div 
                id={'memberBio'} 
                className={`columns-2 overflow-hidden transition-all duration-700 ease-in-out ${
                    textExpanded ? 'max-h-[5000px]' : 'max-h-[450px]'
                }`}
            >
                {bio && bio.length > 0 && (
                    <BlocksRenderer
                        // @ts-expect-error BlocksRenderer expects specific block format from Strapi
                        content={bio}
                    />
                )}
            </div>
            <button 
                onClick={() => setTextExpanded(!textExpanded)} 
                className={'mt-2 font-medium main-bg-color text-white px-5 py-2 rounded-md'}
            >
                {textExpanded ? 'Show less' : 'Show more'}
            </button>
        </>
    );
}

