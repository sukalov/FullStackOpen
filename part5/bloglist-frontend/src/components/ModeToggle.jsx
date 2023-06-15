import { Sun, Moon } from "lucide-react"

const ModeToggle = ({ mode, setMode }) => {

    const handleClick = () => {
        setMode(mod => {
            const newMod = mod === 'light' ? 'dark' : 'light'
            localStorage.setItem('mode', newMod)
            return newMod
        })
    }

    return (
        <button onClick={handleClick} className='my-auto p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 dark:focus-visible:ring-orange-300 focus-visible:ring-offset-2 dark:ring-offset-stone-800 dark:text-orange-100 right-0 text-sm m-3 transition duration-200 ease-in-out cursor-pointer aspect-square! hover:animate-[spin_1s_ease-in-out_1] hover:bg-orange-100 dark:hover:bg-stone-700'>
            {mode === 'dark' 
                ? <Sun  size={22} strokeWidth={1.5} /> 
                : <Moon size={22} strokeWidth={1.5} />}
        </button>
    )
}

export default ModeToggle