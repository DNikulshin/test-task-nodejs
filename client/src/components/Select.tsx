import { useState } from "react"
import { IAppeal } from "../models/Appeal"
import { useStore } from "../store/store"


const selectStatusList = [
    { value: 'new' },
    { value: 'atWork' },
    { value: 'completed' },
    { value: 'canceled' }
]


export const Select = (appeal: IAppeal) => {
    const update = useStore(state => state.update)
    const [selectStatus, setSelectStatus] = useState('')

    const updateStatusHandler = async (appeal: IAppeal) => {
        await update(appeal)

    }
    console.log(selectStatus)

    return <select
        onChange={e => setSelectStatus(e.target.value)}
        value={appeal.status}
        defaultValue={appeal.status}
    >
        {
            selectStatusList.
                map(status =>
                    <option
                        key={status.value}
                        className={`px-2 py-1 rounded-sm`}
                        onClick={() => updateStatusHandler({ ...appeal, status: selectStatus })}
                    >
                        {status.value}
                    </option>
                )
        }
    </select>
}