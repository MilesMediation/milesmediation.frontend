'use client';

import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import {RichTextBlock} from "@/types/api";
import {ReactNode} from "react";

/**
 * Custom block renderers for rich text content
 * Handles lists, headings, and other content blocks with custom styling
 */


const customBlockRenderers = {
    list: ({ children, format }: { children?: ReactNode; format?: 'unordered' | 'ordered' }) => {
        const className =
            format === 'unordered'
                ? 'list-disc pl-6 text-gray-700'
                : 'list-decimal pl-6 text-blue-700';

        return <ul className={className}>{children}</ul>;
    },
    listItem: ({ children }: { children?: ReactNode }) => {
        return <li className="mb-2">{children}</li>;
    },
    heading: ({ children, level }: { children?: ReactNode; level?: number }) => {
        const headingLevel = level || 1;
        const className = `font-bold main-text-color mb-4 ${
            headingLevel === 1 ? 'text-4xl' :
            headingLevel === 2 ? 'text-3xl' :
            headingLevel === 3 ? 'text-2xl' :
            headingLevel === 4 ? 'text-xl' :
            headingLevel === 5 ? 'text-lg' :
            'text-base'
        }`;
        
        switch (headingLevel) {
            case 1:
                return <h1 className={className}>{children}</h1>;
            case 2:
                return <h2 className={className}>{children}</h2>;
            case 3:
                return <h3 className={className}>{children}</h3>;
            case 4:
                return <h4 className={className}>{children}</h4>;
            case 5:
                return <h5 className={className}>{children}</h5>;
            case 6:
                return <h6 className={className}>{children}</h6>;
            default:
                return <h1 className={className}>{children}</h1>;
        }
    },
};

/**
 * ArticleContent component renders rich text content from Strapi CMS
 * 
 * @param content - Array of rich text blocks from Strapi
 * @returns JSX element with formatted article content
 */
export default function ArticleContent({content}: {content: RichTextBlock[]}) {
    return (
       <>
           <BlocksRenderer
               // @ts-expect-error RichTextBlock[] is compatible with RootNode[] for our use case
               content={content}
               blocks={customBlockRenderers}
           />
       </>
    );
}