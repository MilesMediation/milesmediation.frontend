export default function RatesSectionNeutral() {


    return (
        <>
            <div className="my-20">
                <div className={'text-center'}>

                    <h2 className={'h2-title-section mb-5'}>Rates & Fees</h2>
                    <p>Conferences, documents review, order/award drafting, and any additional consultation that a party
                        to
                        the arbitration rquest or deemed necessary by the arbitrator will be biled at the </p>
                </div>
                <div className="my-20 grid grid-cols-2 gap-10">
                    <div>
                        <div>
                            <label htmlFor="username"
                                   className="block text-sm/6 font-medium text-gray-900">Number of parties</label>
                            <div className="mt-2">
                                <div
                                    className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                    <div
                                        className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">workcation.com/
                                    </div>
                                    <input type="text" name="username" id="username"
                                           className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                           placeholder="janesmith"/>
                                </div>
                            </div>
                        </div>
                        <div className={'mt-10'}>
                            <label htmlFor="username"
                                   className="block text-sm/6 font-medium text-gray-900">Estimated number of
                                hours</label>
                            <div className="mt-2">
                                <div
                                    className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                    <div
                                        className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">workcation.com/
                                    </div>
                                    <input type="text" name="username" id="username"
                                           className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                           placeholder="janesmith"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className="relative flex flex-col w-full h-full overflow-hidden text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                            <table className="w-full text-left table-auto min-w-max ">
                                <thead>
                                <tr>
                                    <th colSpan={2} className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 tabkle">
                                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Cost breakdown
                                        </p>
                                    </th>


                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            Rate
                                        </p>
                                    </td>
                                    <td className="p-4 text-right">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            $350,00
                                        </p>
                                    </td>

                                </tr>
                                <tr>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            Hours
                                        </p>
                                    </td>
                                    <td className="p-4 text-right">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            2
                                        </p>
                                    </td>


                                </tr>
                                <tr>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            Party
                                        </p>
                                    </td>
                                    <td className="p-4 text-right">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            2
                                        </p>
                                    </td>

                                </tr>
                                <tr>
                                    <td className="p-4">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            Fee
                                        </p>
                                    </td>
                                    <td className="p-4 text-right">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            $1500
                                        </p>
                                    </td>


                                </tr>
                                <tr className={'bg-teal-800/20'}>
                                    <td className="p-4">
                                        <p className="font-bold block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                                            Total
                                        </p>
                                    </td>
                                    <td className="p-4 text-right">
                                        <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                            $3000
                                        </p>
                                    </td>


                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}