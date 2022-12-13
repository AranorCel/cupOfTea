import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material'

const Cart = () => {
    const [cart, setCart] = useState([])
    const dispatch = useDispatch()

    const state = useSelector(state => state.cartList.cart.map(product =>
        [
            { label: "Ref", value: product.ref, type: "text" },
            { label: "Nom", value: product.name, type: "text" },
            { label: "Catégorie", value: product.category, type: "text" },
            { label: "Image", value: product.image, type: "img" },
            { label: "Format", value: product.bagSize, type: "text" },
            { label: "Quantité", value: product.quantity, type: "value" },
            { label: "Prix Unitaire", value: product.unitPrice, type: "hidden" },
            { label: "Reduction", value: product.discount, type: "hidden" },
            { label: "Prix", value: product.unitPrice * product.quantity * (1 - product.discount), type: "text" },
        ]
    ))

    const getStarted = async () => {
        const res = await dispatch({ type: "cart/isAlreadyLogin" })
        setCart(state)
    }

    useEffect(() => {
        getStarted()
    }, [])


    const modifyQty = (arg) => {
        const tmpCart = [...cart]

        //Modification de la Quantité
        tmpCart[arg.row.nbRow][5].value = Math.max(tmpCart[arg.row.nbRow][5].value + arg.action, 0)

        //Modification du Prix (total)
        tmpCart[arg.row.nbRow][8].value = tmpCart[arg.row.nbRow][5].value * tmpCart[arg.row.nbRow][6].value * (1 - tmpCart[arg.row.nbRow][7].value)
        setCart(tmpCart)
    }

    // console.log(cart.length)

    return (
        <>
            {(cart.length >0 ) && <TableContainer component={Paper}>
                <Table aria-label='Cart' stickyHeader>
                    <TableHead>
                        <TableRow>
                            {cart[0].flatMap((header, i) => (header.type === "hidden" ? [] : <TableCell key={i}>{header.label}</TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.flatMap((row, nbRow) => (
                            <TableRow key={nbRow} sx={{ '& last-child td, &:last-child th': { border: 0 } }} >
                                {row.flatMap((field, i) => (field.type === "hidden" ? [] :
                                    <TableCell key={i}>
                                        {(field.type === "text" && field.value)}
                                        {(field.type === "img" && <img src={field.value} alt="" height="50" width="50" />)}
                                        {(field.type === "value" && (
                                            <>
                                                <button onClick={() => modifyQty({ row: { nbRow }, action: -1 })}>-</button>
                                                <input type="text" value={field.value} disabled />
                                                <button onClick={() => modifyQty({ row: { nbRow }, action: 1 })}>+</button>
                                            </>
                                        ))}
                                    </TableCell>))}
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>
                                <p>{cart.map(product => product[8].value).reduce((a, b) => a + b).toFixed(2)}</p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </TableContainer>}
        </>
    )
}

export default Cart