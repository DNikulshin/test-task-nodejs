import { useEffect, useState } from "react";
import { useStore } from "./store/store";
import { ToastContainer } from "react-toastify";
import { Appeal } from "./components/Appeal";

function App() {
  const appealList = useStore(state => state.appealList);
  const getAll = useStore(state => state.getAll);
  const create = useStore(state => state.create);
  const cancelAllInWork = useStore(state => state.cancelAllInWork);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isSingleDate, setIsSingleDate] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

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
    if (isSingleDate) {
      getAll(startDate, startDate);
    } else {
      getAll(startDate, endDate);
    }
  }, [startDate, endDate, isSingleDate, getAll, appealList.length]);


  return (
    <div className="flex flex-col h-screen pt-3 container max-w-[1200px] mx-auto text-center px-2 py-2 bg-gray-200/75">
      <h1 className="text-3xl mb-5">Appeals List</h1>
      {isOpen && <form className="flex justify-center items-center flex-col gap-3 shadow-lg mx-auto px-4 py-4 bg-gray-300/85 mb-5 rounded-md  w-full sticky  top-0">
        <div className="flex flex-col gap-3 justify-center items-center">
          <input className="border px-2 py-2 w-full" type="text" placeholder="Enter title..."
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <textarea className="border px-2 py-2 min-w-[300px] min-h-[50px]" placeholder="Enter description..."
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
          <button className="flex ml-auto bg-green-600/75 cursor-pointer px-2 py-1 rounded-sm" type="button"
            onClick={createHandler}
          >
            Сreate
          </button>
        </div>

      </form>}

      <div className="flex justify-center items-center flex-wrap gap-3 mb-4">

        <button className="flex bg-green-600/75 px-2 py-1 justify-center w-fit rounded-sm justify-center items-center cursor-pointer text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >

          {isOpen ? "Close" : 'Сreate appeal'}

        </button>
        <label className="flex gap-1 px-2 py-1">
          <input
            type="radio"
            checked={isSingleDate}
            onChange={() => setIsSingleDate(true)}
          />
          One date
        </label>
        <label className="flex gap-1  px-2 py-1">
          <input
            type="radio"
            checked={!isSingleDate}
            onChange={() => setIsSingleDate(false)}
          />
          Date range
        </label>

        <button className="bg-red-400/85 rounded-sm px-2 py-1 cursor-pointer shadow-md disabled:bg-gray-300/85"
          disabled={!appealList.length}
          onClick={() => cancelAllInWork()}
        >
          Cancel All in Work
        </button>

      </div>

      {isSingleDate ? (
        <div className="flex gap-3 bg-gray-300 items-start justify-start mb-2">
          <input
            className="bg-gray-400 px-2 rounded-sm"
            type="date"
            onChange={e => setStartDate(e.target.value)}
            value={startDate}
          />
        </div>
      ) : (
        <div className="flex gap-3 bg-gray-300 items-start justify-start mb-2">
          <input
            className="bg-gray-400 px-2 rounded-sm"
            type="date"
            onChange={e => setStartDate(e.target.value)}
            value={startDate}
          />
          <input
            className="bg-gray-400 px-2  rounded-sm"
            type="date"
            onChange={e => setEndDate(e.target.value)}
            value={endDate}
          />
        </div>
      )}

      <div className="flex flex-col w-full justify-center items-center gap-2 pb-4">
        {appealList.length ? (
          appealList.map((appeal, idx) => (
            <Appeal appeal={appeal} key={idx} />
          ))
        ) : (
          <p className="text-2xl text-red-500">No Appeals ...</p>
        )}
      </div>

      <ToastContainer position='top-center' />
    </div>
  );
}

export default App;
