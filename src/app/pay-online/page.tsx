import PageHeader from "@/components/global/PageHeader";
import MainNavigation from "@/components/global/MainNavigation";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import CallToAction from "@/components/global/CallToAction";
import Footer from "@/components/global/Footer";
import {Button} from "@/components/ui/button";


export default function Page(){


    return(
        <>
            <MainNavigation />
            <PageHeader title={'Pay online'}/>
            <main>
                <section>
                    <div className="container mx-auto py-10">
                        <p className="">
                            You’ll find our current W-9 Form here.
                            For instructions on paying by check, ACH/bank transfer, or wire transfer. click HERE.
                        </p>

                        {/* Order Information */}
                        <div className={'mt-10'}>
                            <h2 className={'text-xl font-bold'}>
                                Order Information
                            </h2>
                            <div className={'mt-5'}>

                                <div className="grid grid-cols-3 w-full max-w-2xl items-center gap-5">
                                    <div>
                                        <Label htmlFor="picture">Invoice number *</Label>
                                        <Input id="picture" type="text" required />
                                    </div>
                                    <div>
                                        <Label htmlFor="picture">Invoice Amount *</Label>
                                        <Input id="picture" type="text" />
                                    </div>
                                    <div>
                                        <Label htmlFor="picture">Description</Label>
                                        <Input id="picture" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Credit card Information */}
                        <div className={'mt-10'}>
                            <h2 className={'text-xl font-bold'}>
                                Credit card
                            </h2>
                            <div className={'mt-5'}>

                                <div className="grid grid-cols-3 w-full max-w-2xl items-center gap-5">
                                    <div className={'col-span-3'}>
                                        <Label htmlFor="picture">Card number</Label>
                                        <Input id="picture" type="text"  />
                                    </div>
                                    <div>
                                        <Label htmlFor="picture">Month</Label>
                                        <Input id="picture" type="text" />
                                    </div>
                                    <div>
                                        <Label htmlFor="picture">Year</Label>
                                        <Input id="picture" type="text" />
                                    </div>
                                    <div>
                                        <Label htmlFor="picture">Security Code</Label>
                                        <Input id="picture" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Billing Information */}
                        <div className={'mt-10'}>
                            <h2 className={'text-xl font-bold'}>
                                Billing Information
                            </h2>
                            <div className={'mt-5'}>

                                <div className="grid grid-cols-3 w-full max-w-2xl items-center gap-5">
                                    <div>
                                        <Label htmlFor="picture">FIrst name</Label>
                                        <Input id="picture" type="text" />
                                    </div>
                                    <div>
                                        <Label htmlFor="picture">Last name</Label>
                                        <Input id="picture" type="text" />
                                    </div>
                                    <div>
                                        <Label htmlFor="picture">Company</Label>
                                        <Input id="picture" type="text" />
                                    </div>
                                    <div className={'col-span-3'}>
                                        <Label htmlFor="picture">Address</Label>
                                        <Input id="picture" type="text" />
                                    </div>
                                    <div className={'col-span-3'}>
                                        <Label htmlFor="picture">Address 2</Label>
                                        <Input id="picture" type="text" />
                                    </div>
                                    <div className={'col-span-1'}>
                                        <Label htmlFor="picture">City</Label>
                                        <Input id="picture" type="text" />
                                    </div>
                                    <div className={'col-span-1'}>
                                        <Label htmlFor="picture">State/Province/Region</Label>
                                        <Input id="picture" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className={'mt-10 flex gap-4'}>
                            <Button variant="default">
                                Confirm
                            </Button>
                            <Button variant={'outline'}>
                                Cancel
                            </Button>
                        </div>


                    </div>
                </section>
            </main>
            <CallToAction />
            <Footer />
        </>
    )
}