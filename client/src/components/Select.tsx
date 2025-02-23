import { useState } from "react"
import { IAppeal } from "../models/Appeal"
import { Option } from "./Option"


interface Props {
    appeal: IAppeal
    updateStatusHandler: (appeal: IAppeal) => Promise<void>
    isLoadingUpdate: boolean
}

const selectStatusList = [
    { value: 'new' },
    { value: 'inWork' },
    { value: 'completed' },
    { value: 'canceled' }
]

export const Select = ({ appeal, updateStatusHandler, isLoadingUpdate }: Props) => {
    const [selectStatus, setSelectStatus] = useState(appeal.status)

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;

        if (newStatus !== appeal.status) {
            setSelectStatus(newStatus);
            updateStatusHandler({ ...appeal, status: newStatus, updatedAt: new Date().toISOString() });
        }
    }

    if (isLoadingUpdate) {
        return (
            <div>Update...</div>
        )

    }

    return (
        <select
            onChange={handleChange}
            value={selectStatus}
            className={`px-2 py-1 rounded-sm cursor-pointer text-center border ${selectStatus}`}
        >
            {selectStatusList.map((status, idx) =>
                <Option status={status} key={status.value + idx} />)
            }
        </select>
    )

}
