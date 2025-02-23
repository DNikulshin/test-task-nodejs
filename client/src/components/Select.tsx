import { useState, useEffect } from "react"
import { IAppeal } from "../models/Appeal"

interface Props {
    appeal: IAppeal
    updateStatusHandler: (appeal: IAppeal) => Promise<void>
}

const selectStatusList = [
    { value: 'new' },
    { value: 'inWork' },
    { value: 'completed' },
    { value: 'canceled' }
]

export const Select = ({ appeal, updateStatusHandler }: Props) => {
    const [selectStatus, setSelectStatus] = useState(appeal.status)

    useEffect(() => {
        setSelectStatus(appeal.status);
    }, [appeal.status]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setSelectStatus(newStatus);
        updateStatusHandler({ ...appeal, status: newStatus });
    }

    return (
        <select
            onChange={handleChange}
            value={selectStatus}
            className={`px-2 py-1 rounded-sm cursor-pointer ${selectStatus}`}
        >
            {selectStatusList.map(status => (
                <option
                    key={status.value}
                    className={status.value}
                    value={status.value}
                >
                    {status.value}
                </option>
            ))}
        </select>
    )

}
