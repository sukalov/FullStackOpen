import { AlertTriangle } from "lucide-react"

const Alert = ({ error }) => {
    return (
        <div className="absolute left-1/2 -translate-x-1/2! bottom-2 border border-red-500 bg-red-300 rounded-md px-4 py-2 dark:bg-opacity-20 animate-bounce-in dark:text-red-200">
            <AlertTriangle size={22} strokeWidth={1.25} className="inline mb-1"/>
            <p className="inline mx-2 font-light">{error}</p>
        </div>
    )
}

export default Alert