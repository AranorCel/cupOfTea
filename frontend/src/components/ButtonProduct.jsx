import React, { useState } from 'react'

const ButtonProduct = ({ myRef, unitPrice, discount }) => {
    const [value, setValue] = useState(0)
    console.log(unitPrice, discount)
    return (
        <>
            <h3>{(parseFloat(unitPrice) * value * (1 - parseFloat(discount))).toFixed(2)} €</h3>
            <div className='addProduct'>
                <button onClick={() => setValue(Math.max(value - 1, 0))}> - </button>
                <p ref={myRef}> {value} </p>
                <button onClick={() => setValue(Math.min(value + 1, 10))}> + </button>
            </div>
        </>
    )
}

export default ButtonProduct