
import { useState } from "react"
import { IAppeal } from "../models/Appeal"
import { useStore } from "../store/store"
import { formatDate } from "../utils/formatDate"
import { Select } from "./Select"

interface Props {
    appeal: IAppeal,
    isLoadingUpdate: boolean

}

export const Appeal = ({ appeal, isLoadingUpdate }: Props) => {
    const update = useStore(state => state.update)
    const [solutionText, setSolutionText] = useState(appeal.comment)
    const [cancellationReason, setCancellationReason] = useState(appeal.comment)
    // const [comment, setComment] = useState(appeal.comment || '');


    const updateStatusHandler = async (appeal: IAppeal) => {

        let updatedAppeal = { ...appeal };

        if (appeal.status === 'completed') {
            updatedAppeal.comment = solutionText;
            // setComment(solutionText)
            setSolutionText('');
        } else if (appeal.status === 'canceled') {
            updatedAppeal.comment = cancellationReason; //
            // setComment(cancellationReason)
            setCancellationReason('');
        }
        await update(updatedAppeal)
    }


    return (
        <div
            className="flex justify-between  items-center w-full border  px-4 py-2 flex-wrap shadow-md"
        >
            <div className="flex items-center w-full border-b mb-2  justify-between py-2 flex-wrap">

                <div className="flex gap-2  items-center">
                    <span>status:</span>
                    {isLoadingUpdate
                        ? <span>Update...</span>
                        : <Select appeal={appeal} updateStatusHandler={updateStatusHandler} />}


                </div>
                <div>updatedAt: {appeal.updatedAt && formatDate(appeal.updatedAt)}</div>
            </div>
            <div className="flex flex-col items-start gap-3">
                <div className="flex gap-2">
                    <span>title:</span>
                    {appeal.title}
                </div>
                <div className="flex gap-2">
                    <span>description:</span>
                    {appeal.description}
                </div>
                {appeal.status === 'completed' && <div>
                    <label>Solution:</label>
                    <input
                        type="text"
                        value={solutionText}
                        onChange={(e) => setSolutionText(e.target.value)}
                        placeholder="Enter solution here"
                    />

                    <button
                        onClick={() => updateStatusHandler(appeal)}
                    >
                        Send
                    </button>
                    <p>{appeal.comment}</p>
                </div>
                }

                {appeal.status === 'canceled' && <div>
                    <label>Cancellation Reason:</label>
                    <input
                        type="text"
                        value={cancellationReason}
                        onChange={(e) => setCancellationReason(e.target.value)}
                        placeholder="Enter cancellation reason here"
                    />

                    <button
                        onClick={() => updateStatusHandler(appeal)}
                    >
                        Send
                    </button>
                    <p>{appeal.comment}</p>
                </div>}
            </div>
        </div>
    )
}
