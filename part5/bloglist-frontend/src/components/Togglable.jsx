import { forwardRef } from "react"
import { useState, useImperativeHandle } from "react"

const Togglable = forwardRef(({ controllerHide, controllerShow, children, childId}, refs) => {
    const [visible, setVisible] = useState(false)
  
    const toggleVisibility = () => {
      setVisible(!visible)
    }
  
    useImperativeHandle(refs, () => {
      return { toggleVisibility }
    })
  
    return (
      <div>
        {!visible 
        ? <div>
            <button onClick={toggleVisibility}>X</button>
          </div>
        : <div>
            <button onClick={toggleVisibility}>0</button>
            {children}
          </div>
        }
      </div>
    )
  })
  
  export default Togglable