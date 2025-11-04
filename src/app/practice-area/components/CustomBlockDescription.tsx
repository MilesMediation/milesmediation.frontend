import {RichTextBlock} from "@/types/api";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";


export default function CustomBlockDescription({content}: {content: RichTextBlock[]}){


    return (
        <>
            <BlocksRenderer
                // @ts-expect-error RichTextBlock[] is compatible with RootNode[] for our use case
                content={content}
                // blocks={customBlockRenderers}
            />
        </>
    )
}