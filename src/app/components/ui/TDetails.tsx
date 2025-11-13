"use client"

export function TDetails({tName,wAmnt,totalToken}:{tName:string,wAmnt:number,totalToken:string}) {

    return (
        <div className="relative z-0 max-w-lg mx-auto rounded-md border border-gray-300 px-6 py-4 mt-4 bg-white shadow-sm">
            <h2 className="text-sm font-semibold text-black mb-3">
                Transaction Details
            </h2>

            <div className="flex flex-col text-xs space-y-2 text-gray-700">
                <div className="flex justify-between">
                    <span className="font-medium">Token Name:</span>
                    <span>{tName?tName:"Invalid Address"}</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium">Amount (wei):</span>
                    <span>{wAmnt}</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium">Amount (tokens):</span>
                    <span>{totalToken}</span>
                </div>
            </div>
        </div>
    )
}