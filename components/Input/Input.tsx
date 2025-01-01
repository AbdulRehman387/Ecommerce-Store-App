import React from 'react'

const Input = (props: any) => {
    return (
        <div className='mb-4 w-full'>
            <input
                onChange={props.func}
                className='flex-grow text-left p-3 border border-black rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-black transition-shadow duration-200'
                type="text"
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                aria-label="Username" // Added aria-label for accessibility
                required // Mark as required
            />
        </div>
    )
}

export default Input