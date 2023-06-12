import { Ban, CheckCircle } from "lucide-react"

const Alert = ({ event }) => {
    return (
        event.status === 'bad' ?
        <div className="fixed md:right-2 md:bottom-3 border border-red-500 bg-red-300 rounded-md px-3 py-2 dark:bg-opacity-20 animate-bounce-in dark:text-red-200">
            <Ban size={18} strokeWidth={1.5} className="inline mb-1" />
            <p className="inline mx-2 font-light">{event.message}</p>
        </div> :
        <div className="fixed right-2 bottom-3 border border-green-500 bg-green-300 rounded-md px-3 py-2 dark:bg-opacity-20 animate-bounce-in dark:text-green-200">
            <CheckCircle size={18} strokeWidth={1.5} className="inline mb-0.5" />
            <p className="inline mx-2 font-light">{event.message}</p>
        </div> 

    )

}

export default Alert