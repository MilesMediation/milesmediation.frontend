import {URL_BACKOFFICE_DOMAIN} from "@/lib/globalConstants";

export default function AuthorComponent({avatar, name, short_description}: {avatar?: string, name: string, short_description: string}) {
    console.log('avagarr', avatar)
    return (
        <div className="container mx-auto mt-10">
            <div className="flex">
                <div className="w-[250px] h-[250px] shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={URL_BACKOFFICE_DOMAIN +avatar}
                        className="object-cover w-[250px] h-[250px]"
                        alt=""
                    />
                </div>

                <div className="bg-[#B0DBDF] grow p-10">
                    <h4 className="text-4xl mb-4 font-title font-medium main-text-color">
                        About {name || 'the Author'}
                    </h4>
                    <p>
                        {short_description || 'Description not available.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
