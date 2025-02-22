import { useEffect, useState } from "react"
import { useStore } from "./store/store"
import { formatDate } from "./utils/formatDate"
import { ToastContainer } from "react-toastify"
import { Select } from "./components/Select"

function App() {
  const appealList = useStore(state => state.appealList)
  const getAll = useStore(state => state.getAll)
  const create = useStore(state => state.create)

  const isLoading = useStore(state => state.isLoading)

  const [title, setTitle] = useState('')

  const [description, setDescription] = useState('')


  const createHandler = async () => {
    if (title && description)
      await create({
        title,
        description
      })
    setTitle('')
    setDescription('')

  }


  useEffect(() => {
    getAll()
  }, [appealList.length])



  if (isLoading) {
    return (
      <div>Загрузка...</div>
    )
  }

  return (
    <div className="flex flex-col h-screen pt-5 container max-w-[1200px] mx-auto text-center px-2 py-2 bg-gray-200/75">
      <h1 className="text-3xl mb-5">appealList</h1>
      <form className="flex justify-center items-center flex-col gap-3 shadow-lg mx-auto px-4 py-4 bg-gray-300/85 mb-5 rounded-md  w-full">
        <div className="flex flex-col gap-3 justify-center items-center">
          <input className="border px-2 py-2" type="text" placeholder="Enter title..."
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <textarea className="border px-2 py-2 min-w-[300px] min-h-[50px]" placeholder="Enter description..."
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <button className="flex ml-auto bg-green-600/75 cursor-pointer px-2 py-1 rounded-sm" type="button"
          onClick={createHandler}
        >Create</button>
      </form>
      <div className="flex flex-col w-full justify-center items-center gap-2">
        {appealList.length ?
          appealList.map(appeal =>
            <div
              className="flex justify-between  items-center w-full border  px-4 py-2 flex-wrap shadow-md"

              key={appeal.id}
            >
              <div className="flex items-center w-full border-b mb-2  justify-between py-2 flex-wrap">
                <div>id: {appeal.id}</div>

                <div className="flex gap-2">
                  status:
                  <span className={appeal.status}

                  >{appeal.status}</span>
                  <Select {...appeal} key={appeal.status} />

                  {/* <button className="bg-blue-400 px-2 py-1 rounded-sm"
                    onClick={() => updateStatusHandler({ ...appeal, status: 'atWork' })}
                  >
                    AtWork
                  </button> */}
                </div>
                <div>updatedAt: {appeal.updatedAt && formatDate(appeal.updatedAt)}</div>
              </div>
              <div className="flex flex-col items-start gap-3">
                <div>
                  title:
                  {appeal.title}
                </div>
                <div>
                  description:
                  {appeal.description}
                </div>
              </div>
            </div>

          )
          : <p className="text-2xl text-red-500">No Appeals ...</p>
        }
      </div>
      <ToastContainer position='top-center' />
    </div>
  )
}

export default App
