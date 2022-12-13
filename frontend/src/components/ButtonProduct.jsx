import React, {useState} from 'react'

const ButtonProduct = ({myRef}) => {
    const [value, setValue] = useState(0)
    return (
        <div className='addProduct'>
            <button onClick={() => setValue(Math.max(value - 1, 0))}> - </button>
            <p ref={myRef}> {value} </p>
            <button onClick={() => setValue(Math.min(value + 1, 10))}> + </button>
        </div>
    )
}

export default ButtonProduct