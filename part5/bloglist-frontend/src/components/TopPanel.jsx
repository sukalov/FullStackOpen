import LogoutButton from "./LogoutButton"
import ModeToggle from "./ModeToggle"

const TopPanel = ({ mode, setMode, logout, user }) => {
    return (
        <nav className=" flex space-x-3 absolute right-0 px-3">
            {user && <LogoutButton logout={logout}/> }
            <ModeToggle mode={mode} setMode={setMode}/>
        </nav>
    )
}

export default TopPanel