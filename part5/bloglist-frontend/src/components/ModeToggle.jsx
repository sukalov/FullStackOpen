import { Sun, Moon } from "lucide-react"

const ModeToggle = ({ mode, setMode }) => {
    return (
        <button onClick={() => {setMode(mod => !mod)}} className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 dark:focus-visible:ring-orange-300 focus-visible:ring-offset-2 dark:ring-offset-stone-800 dark:text-orange-100 right-0 text-sm m-5 hover:opacity-50 transition duration-200 ease-in-out cursor-pointer aspect-square'>
            {!mode ? <Sun /> : <Moon />}
        </button>
    )
}

export default ModeToggle