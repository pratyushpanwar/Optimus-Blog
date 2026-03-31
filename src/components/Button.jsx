import React from 'react'

function Button({
    children,
    type= 'button',
    bgColour= 'bg-blue-600',
    className="",
    ...props

}) {
  return (
    <button className={` px-4 py-2 rounded-lg ${className} ${bgColour}`} {...props}
    >
        {children}
    </button>
  )
}

export default Button