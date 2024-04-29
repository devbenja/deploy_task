import { PiEyedropperSampleFill } from "react-icons/pi"


export const Button = ({children, className, ...props}) => {
  return (
    <button 
        className={`text-sm font-semibold text-white mt-2 rounded-md ${className}`}
        {...props}
    >
        {children}
    </button>
  )
}
