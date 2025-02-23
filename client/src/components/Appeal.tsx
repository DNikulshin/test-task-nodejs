
import { useState } from "react"
import { IAppeal } from "../models/Appeal"
import { useStore } from "../store/store"
import { formatDate } from "../utils/formatDate"
import { Select } from "./Select"

interface Props {
    appeal: IAppeal
}

export const Appeal = ({ appeal }: Props) => {
    const update = useStore(state => state.update)
    const [solutionText, setSolutionText] = useState('')
    const [cancellationReason, setCancellationReason] = useState('')
    const [isLoaging, setIsLoading] = useState(false)

    const updateStatusHandler = async (appeal: IAppeal) => {


        const updatedAppeal = { ...appeal };

        if (appeal.status === 'completed') {

            if (solutionText) {
                updatedAppeal.comment = solutionText;
                updatedAppeal.updatedAt = new Date().toISOString()
                setSolutionText('')
            }

        } else if (appeal.status === 'canceled') {
            if (cancellationReason) {
                updatedAppeal.comment = cancellationReason
                updatedAppeal.updatedAt = new Date().toISOString()
                setCancellationReason('')
            }

        }

        setIsLoading(true)
        await update(updatedAppeal)
        setIsLoading(false)
    }

    return (
        <div

            className="flex justify-between  items-center w-full border  px-4 py-2 flex-wrap shadow-md"
        >
            <div className="flex items-center w-full border-b mb-2  justify-between py-2 flex-wrap">

                <div className="flex gap-2  items-center">
                    <span className="font-medium">Status:</span>
                    <Select appeal={appeal} updateStatusHandler={updateStatusHandler} isLoadingUpdate={isLoaging} />
                </div>
                <div><span className="font-medium"> updatedAt:</span>  {appeal.updatedAt && formatDate(appeal.updatedAt)}</div>
            </div>
            <div className="flex flex-col items-start gap-3">
                <div className="flex gap-2">
                    <span className="font-medium">Title:</span>
                    {appeal.title}
                </div>
                <div className="flex gap-2  items-center justify-center">
                    <span className="font-medium">Description:</span>
                    {appeal.description}
                </div>
                {appeal.status === 'completed' &&
                    <>
                        <div className="flex gap-2 items-center justify-center  w-full">

                            <textarea
                                className="min-h-[50px] border shadow-md px-2 rounded-md  min-w-[250px] max-w-[1000px] resize"
                                value={solutionText}
                                onChange={(e) => setSolutionText(e.target.value)}
                                placeholder="Enter solution here..."
                            />

                            <button
                                className="flex bg-green-600/75 px-2 py-1 rounded-sm"
                                onClick={() => updateStatusHandler(appeal)}
                            >
                                Send
                            </button>
                        </div>
                        {appeal.comment && <p className="flex gap-3 flex-col items-start text-left"><span className="font-medium">Comment:</span>{appeal.comment}</p>}
                    </>
                }

                {appeal.status === 'canceled' &&
                    <>
                        <div className="flex gap-2 items-center justify-center w-full">
                            <textarea
                                className="min-h-[50px] border shadow-md px-2 rounded-md min-w-[250px]  max-w-[1000px] resize"
                                value={cancellationReason}

                                onChange={(e) => setCancellationReason(e.target.value)}
                                placeholder="Enter cancellation reason here..."
                            />

                            <button
                                className="flex bg-green-600/75 px-2 py-1 rounded-sm"
                                onClick={() => updateStatusHandler(appeal)}
                            >
                                Send
                            </button>
                        </div>
                        {appeal.comment && <p className="flex gap-3 flex-col items-start text-left"><span className="font-medium">Comment:</span> {appeal.comment}</p>}
                    </>
                }
            </div>
        </div>
    )
}
