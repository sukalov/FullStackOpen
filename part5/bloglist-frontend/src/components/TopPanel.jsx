// import { forwardRef, useImperativeHandle } from "react"
import { forwardRef } from "react"
import Button from "./Button"
import ModeToggle from "./ModeToggle"

const TopPanel = ({ mode, setMode, logout, user, setVisible }, ref) => {

    const handleClick = () => {
        ref.current.setVisible(true)
    }

    return (
        <nav className=" flex space-x-3 absolute right-0 px-3">
            {user && <Button text='add blog' onClick={handleClick} />}
            {user && <Button text='log out' onClick={logout}/> }
            <ModeToggle mode={mode} setMode={setMode}/>
        </nav>
    )
}

export default forwardRef(TopPanel)