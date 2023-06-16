import { AlertTriangle, Ban, Check, CheckCircle, FileWarning, StopCircle, Undo } from "lucide-react"

const Alert = ({ event, setEvent }) => {
    return (
        event.status === 'bad' 
        ?
        <div className="fixed right-2 bottom-3 border border-red-500 bg-red-300 rounded-md px-3 py-2 dark:bg-opacity-20 animate-bounce-in dark:text-red-200">
            <Ban size={18} strokeWidth={1.5} className="inline mb-1" />
            <p className="inline mx-2 font-light">{event.message}</p>
        </div>
        : event.status === 'good' 
        ?
        <div className="fixed right-2 bottom-3 border border-green-500 bg-green-300 rounded-md px-3 py-2 dark:bg-opacity-20 animate-bounce-in dark:text-green-200">
            <CheckCircle size={18} strokeWidth={1.5} className="inline mb-0.5" />
            <p className="inline mx-2 font-light">{event.message}</p>
        </div>
        : <div className="isolate fixed right-2 bottom-3 border border-yellow-500 bg-yellow-300 bg-opacity-60 rounded-md px-3 py-2 dark:bg-opacity-20 animate-bounce-in dark:text-yellow-200">
            <AlertTriangle size={18} strokeWidth={1.5} className="inline mb-0.5" />
        <p className="inline mx-2 font-light">{event.message}</p>
        <button onClick={() => setEvent(null)} className="p-2 rounded-full  hover:bg-orange-500 hover:bg-opacity-20 transition duration-150">
            <Undo className="inline " />
        </button>
        <button onClick={() => event.confirm()} className="p-2 rounded-full hover:bg-orange-500 hover:bg-opacity-30 transition duration-150">
            <Check className="inline" strokeWidth={3} />
        </button>
    </div>

    )

}

export default Alert