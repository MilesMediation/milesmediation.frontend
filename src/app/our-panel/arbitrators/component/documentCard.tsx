import {Button} from "@/components/ui/button";

export default function DocumentCard() {

  return (
      <>
          <div className="border border-gray-300 p-5 rounded-md">
              <div className={'flex gap-4 items-center'}>
                  <div className={'flex-1/6'}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={'/globe.svg'} alt="" className={'w-full'}/>
                  </div>
                  <div className={'flex-5/4'}>

                      <div>
                          <h3 className={'font-bold text-xl main-text-color'}>Demand for Arbitration</h3>
                      </div>
                      <div className={'flex flex-row gap-4 '}>
                          <Button className={'main-text-color underline px-0'} variant={'link'}>Download PDF</Button>
                          <Button className={'main-text-color underline px-0'} variant={'link'}>Download Doc</Button>
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
}