import React from 'react'
import { useId } from 'react'

function Select({
    ref,
    label,
    options,
    className="",
    ...props
}) {
  const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id}></label>}
        <select 
        {...props}
        className={`px-3 py-2 rounded-lg bg-white text-black 
            outline-none focus:bg-gray-50 duration-200 border 
            border-gray-200 w-full ${className}`}
        id={id}
        ref={ref}
        >
            {options?.map((option) => (
                <option 
                value={option}
                key={option}
                >{option}</option>
            ))}
        </select>
    </div>
  )
}

export default Select